import { CreatePropertyInput } from './properties.validator';
import { propertiesRepository } from './properties.repository';
import { toPropertyResponse } from './properties.mapper';
import { PropertyResponse } from './properties.dto';
import { locationService } from '~/shared/services/location.service';
import { BadRequestError, ForbiddenError } from '~/shared/errors';

export const propertiesService = {
  createProperty: async (userId: string, data: CreatePropertyInput): Promise<PropertyResponse> => {
    const ownerProfileId = await propertiesRepository.getOwnerProfileId(userId);
    if (!ownerProfileId) {
      throw new ForbiddenError('يجب استكمال ملف المالك قبل إضافة عقار', 'PRP_001');
    }

    const loc = await propertiesRepository.getLocationNames(data.governorateId, data.cityId);
    if (!loc.governorateName || !loc.cityName) {
      throw new BadRequestError('المحافظة أو المدينة المحددة غير صحيحة', 'PRP_002');
    }

    // Geolocation Validation (Business Rule)
    await locationService.verifyCoordinates(
      data.latitude,
      data.longitude,
      loc.governorateName,
      loc.cityName
    );

    const property = await propertiesRepository.createProperty(ownerProfileId, data);
    return toPropertyResponse(property as any);
  },
};

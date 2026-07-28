import { BadRequestError } from '~/shared/errors';
import { logger } from '~/utils/logger';

interface GeocodeResponse {
  address?: {
    state?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    region?: string;
  };
}

export const locationService = {
  /**
   * Validates if the given coordinates fall within the expected governorate and city.
   * Uses OpenStreetMap's Nominatim API (Free, no API key required).
   */
  verifyCoordinates: async (
    lat: number,
    lng: number,
    expectedGovernorate: string,
    expectedCity: string,
  ): Promise<void> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=ar`;
      
      const response = await fetch(url, {
        headers: {
          // Nominatim requires a valid User-Agent
          'User-Agent': 'SakankApp/1.0 (contact@sakank.com)',
        },
      });

      if (!response.ok) {
        logger.warn('Geocoding service unavailable');
        // If the 3rd party service is down, we might want to bypass or throw. 
        // For now, we bypass to not block users, but log a warning.
        return;
      }

      const data = (await response.json()) as GeocodeResponse;
      
      if (!data.address) {
        throw new BadRequestError('لم نتمكن من تحديد الموقع بناءً على الإحداثيات المقدمة', 'LOC_001');
      }

      // Nominatim might return the governorate in 'state' or 'region'
      const actualGovernorate = data.address.state || data.address.region || '';
      // City might be in 'city', 'town', 'village', or 'county'
      const actualCity = data.address.city || data.address.town || data.address.village || data.address.county || '';

      const normalize = (text: string) => text.replace(/محافظة|مدينة|مركز/g, '').trim();

      const expectedGovNorm = normalize(expectedGovernorate);
      const expectedCityNorm = normalize(expectedCity);
      const actualGovNorm = normalize(actualGovernorate);
      const actualCityNorm = normalize(actualCity);

      // We do a soft inclusion check to account for spelling differences 
      // (e.g. "القاهرة" vs "محافظة القاهرة")
      const govMatches = actualGovNorm.includes(expectedGovNorm) || expectedGovNorm.includes(actualGovNorm);
      
      // City boundaries can be tricky in free APIs, so we prioritize checking the governorate first
      if (!govMatches && actualGovNorm !== '') {
         throw new BadRequestError(
           `الإحداثيات المختارة تقع في (${actualGovernorate}) ولكنك اخترت محافظة (${expectedGovernorate}). يرجى التأكد من موقع الخريطة.`,
           'LOC_002'
         );
      }

      // We only strictly validate city if the API returned one clearly
      if (actualCityNorm !== '') {
        const cityMatches = actualCityNorm.includes(expectedCityNorm) || expectedCityNorm.includes(actualCityNorm);
        if (!cityMatches && !govMatches) {
           throw new BadRequestError(
             `الإحداثيات المختارة لا تتطابق مع المدينة المحددة (${expectedCity}). يرجى التأكد من موقع الخريطة.`,
             'LOC_003'
           );
        }
      }

    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      
      logger.error({ error, lat, lng }, 'Error verifying coordinates');
      // On network errors, we don't want to completely block the user from posting their property.
    }
  },
};

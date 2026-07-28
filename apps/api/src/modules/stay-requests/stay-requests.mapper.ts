import { StayRequest, Listing, Unit, Property, Governorate, City, Area, StudentProfile, User, UnitImage, OwnerProfile } from '@prisma/client';
import { StayRequestResponse } from './stay-requests.dto';
import { sanitizeText } from '~/shared/utils/sanitize';

type StayRequestWithRelations = StayRequest & {
  listing: Listing & {
    unit: Unit & {
      property: Property & {
        governorate: Governorate;
        city: City;
        area: Area;
        ownerProfile: OwnerProfile & { user: User };
      };
      images: UnitImage[];
    };
  };
  studentProfile: StudentProfile & {
    user: User;
  };
};

/**
 * Maps a StayRequest with relations to API response.
 * CRITICAL: Owner phone is ONLY included when status is ACCEPTED.
 */
export const toStayRequestResponse = (stayRequest: StayRequestWithRelations): StayRequestResponse => {
  const unit = stayRequest.listing.unit;
  const property = unit.property;
  const owner = property.ownerProfile.user;
  const student = stayRequest.studentProfile.user;

  const primaryImage =
    unit.images.find((img) => img.isPrimary)?.url ||
    unit.images[0]?.url ||
    null;

  return {
    id: stayRequest.id,
    listingId: stayRequest.listingId,
    status: stayRequest.status,
    message: stayRequest.message ? sanitizeText(stayRequest.message) : null,
    moveInDate: stayRequest.moveInDate.toISOString(),
    durationMonths: stayRequest.durationMonths,
    ownerResponse: stayRequest.ownerResponse ? sanitizeText(stayRequest.ownerResponse) : null,
    respondedAt: stayRequest.respondedAt?.toISOString() || null,
    createdAt: stayRequest.createdAt.toISOString(),
    listing: {
      id: stayRequest.listing.id,
      title: sanitizeText(unit.title),
      monthlyRent: Number(unit.monthlyRent),
      primaryImage,
      location: `${property.area.name}, ${property.city.name}`,
    },
    student: {
      id: student.id,
      firstName: sanitizeText(student.firstName),
      lastName: sanitizeText(student.lastName),
    },
    // Security: Only show owner phone when request is ACCEPTED
    ownerPhone: stayRequest.status === 'APPROVED' ? owner.phone : null,
  };
};

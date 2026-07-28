import { Listing, Unit, Property, PropertyImage, UnitImage, Governorate, City, Area, OwnerProfile, User } from '@prisma/client';
import { ListingFeedItem, ListingDetailResponse } from './listings.dto';
import { sanitizeText } from '~/shared/utils/sanitize';

type ListingWithRelations = Listing & {
  unit: Unit & {
    property: Property & {
      governorate: Governorate;
      city: City;
      area: Area;
      ownerProfile: OwnerProfile & { user: User };
      images: PropertyImage[];
    };
    images: UnitImage[];
  };
};

/**
 * Maps a Listing with all relations to a feed item (minimal data).
 */
export const toListingFeedItem = (listing: ListingWithRelations): ListingFeedItem => {
  const unit = listing.unit;
  const property = unit.property;

  const primaryImage =
    unit.images.find((img) => img.isPrimary)?.url ||
    unit.images[0]?.url ||
    property.images.find((img) => img.isPrimary)?.url ||
    property.images[0]?.url ||
    null;

  return {
    id: listing.id,
    title: sanitizeText(unit.title),
    description: sanitizeText(unit.description).substring(0, 200),
    monthlyRent: Number(unit.monthlyRent),
    unitType: unit.unitType,
    genderRestriction: unit.genderRestriction,
    availabilityStatus: unit.availabilityStatus,
    availableFrom: unit.availableFrom.toISOString(),
    capacity: unit.capacity,
    availableBeds: unit.availableBeds,
    isFeatured: listing.isFeatured,
    primaryImage,
    location: {
      governorate: property.governorate.name,
      city: property.city.name,
      area: property.area.name,
    },
    createdAt: listing.createdAt.toISOString(),
  };
};

/**
 * Maps a Listing with all relations to a full detail response.
 * Owner phone is intentionally OMITTED per security spec.
 */
export const toListingDetailResponse = (
  listing: ListingWithRelations,
  isFavorited: boolean,
): ListingDetailResponse => {
  const unit = listing.unit;
  const property = unit.property;
  const owner = property.ownerProfile.user;

  return {
    id: listing.id,
    title: sanitizeText(unit.title),
    description: sanitizeText(unit.description),
    monthlyRent: Number(unit.monthlyRent),
    securityDeposit: Number(unit.securityDeposit),
    unitType: unit.unitType,
    genderRestriction: unit.genderRestriction,
    availabilityStatus: unit.availabilityStatus,
    availableFrom: unit.availableFrom.toISOString(),
    capacity: unit.capacity,
    availableBeds: unit.availableBeds,
    isFeatured: listing.isFeatured,
    publishedAt: listing.publishedAt?.toISOString() || null,
    images: unit.images
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((img) => ({
        id: img.id,
        url: img.url,
        displayOrder: img.displayOrder,
        isPrimary: img.isPrimary,
      })),
    property: {
      id: property.id,
      title: sanitizeText(property.title),
      description: sanitizeText(property.description),
      address: sanitizeText(property.address),
      latitude: Number(property.latitude),
      longitude: Number(property.longitude),
      propertyType: property.propertyType,
      images: property.images
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((img) => ({
          id: img.id,
          url: img.url,
          displayOrder: img.displayOrder,
          isPrimary: img.isPrimary,
        })),
    },
    owner: {
      id: owner.id,
      firstName: sanitizeText(owner.firstName),
      lastName: sanitizeText(owner.lastName),
      // phoneNumber intentionally omitted
    },
    location: {
      governorate: { id: property.governorate.id, name: property.governorate.name },
      city: { id: property.city.id, name: property.city.name },
      area: { id: property.area.id, name: property.area.name },
    },
    isFavorited,
    createdAt: listing.createdAt.toISOString(),
  };
};

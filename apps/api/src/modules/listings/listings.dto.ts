export interface ListingFeedItem {
  id: string;
  title: string;
  description: string;
  monthlyRent: number;
  unitType: string;
  genderRestriction: string;
  availabilityStatus: string;
  availableFrom: string;
  capacity: number;
  availableBeds: number;
  isFeatured: boolean;
  primaryImage: string | null;
  location: {
    governorate: string;
    city: string;
    area: string;
  };
  createdAt: string;
}

export interface ListingDetailResponse {
  id: string;
  title: string;
  description: string;
  monthlyRent: number;
  securityDeposit: number;
  unitType: string;
  genderRestriction: string;
  availabilityStatus: string;
  availableFrom: string;
  capacity: number;
  availableBeds: number;
  isFeatured: boolean;
  publishedAt: string | null;
  images: { id: string; url: string; displayOrder: number; isPrimary: boolean }[];
  property: {
    id: string;
    title: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    propertyType: string;
    images: { id: string; url: string; displayOrder: number; isPrimary: boolean }[];
  };
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    // phoneNumber is intentionally OMITTED per security spec
  };
  location: {
    governorate: { id: string; name: string };
    city: { id: string; name: string };
    area: { id: string; name: string };
  };
  isFavorited: boolean;
  createdAt: string;
}

export interface ListingsQueryDto {
  cursor?: string;
  limit: number;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string;
  unitType?: string;
  governorateId?: string;
  cityId?: string;
  areaId?: string;
  search?: string;
  sort?: string;
}

export interface FavoriteToggleResponse {
  isFavorited: boolean;
}

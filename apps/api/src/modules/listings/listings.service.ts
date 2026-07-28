import { NotFoundError } from '~/shared/errors';
import { CursorPaginationMeta, PaginationMeta } from '~/shared/types';
import { listingsRepository } from './listings.repository';
import { ListingFeedItem, ListingDetailResponse, ListingsQueryDto, FavoriteToggleResponse } from './listings.dto';
import { toListingFeedItem, toListingDetailResponse } from './listings.mapper';

export const listingsService = {
  /**
   * Returns paginated listing feed with filters and sorting.
   */
  getListingsFeed: async (
    query: ListingsQueryDto,
    userId: string,
  ): Promise<{ items: ListingFeedItem[]; meta: CursorPaginationMeta }> => {
    const listings = await listingsRepository.findPublishedListings(query);

    const hasMore = listings.length > query.limit;
    const items = hasMore ? listings.slice(0, query.limit) : listings;

    const feedItems = items.map(toListingFeedItem);
    const lastItem = items[items.length - 1];

    return {
      items: feedItems,
      meta: {
        cursor: lastItem?.id || null,
        limit: query.limit,
        hasMore,
      },
    };
  },

  /**
   * Returns full listing details by ID.
   */
  getListingDetail: async (
    listingId: string,
    userId: string,
  ): Promise<ListingDetailResponse> => {
    const listing = await listingsRepository.findListingById(listingId);

    if (!listing) {
      throw new NotFoundError('Listing');
    }

    // Check if favorited by current user
    const studentProfileId = await listingsRepository.getStudentProfileId(userId);
    let isFavorited = false;
    if (studentProfileId) {
      const favorite = await listingsRepository.findFavorite(studentProfileId, listingId);
      isFavorited = !!favorite;
    }

    return toListingDetailResponse(listing, isFavorited);
  },

  /**
   * Returns up to 3 nearby/related listings.
   */
  getRelatedListings: async (listingId: string): Promise<ListingFeedItem[]> => {
    const listing = await listingsRepository.findListingById(listingId);

    if (!listing) {
      throw new NotFoundError('Listing');
    }

    const areaId = listing.unit.property.areaId;
    const related = await listingsRepository.findRelatedListings(listingId, areaId);

    return related.map(toListingFeedItem);
  },

  /**
   * Toggles a listing in the student's favorites.
   */
  toggleFavorite: async (
    userId: string,
    listingId: string,
  ): Promise<FavoriteToggleResponse> => {
    const studentProfileId = await listingsRepository.getStudentProfileId(userId);

    if (!studentProfileId) {
      throw new NotFoundError('Student Profile');
    }

    // Check if listing exists
    const listing = await listingsRepository.findListingById(listingId);
    if (!listing) {
      throw new NotFoundError('Listing');
    }

    // Toggle
    const existingFavorite = await listingsRepository.findFavorite(studentProfileId, listingId);

    if (existingFavorite) {
      await listingsRepository.deleteFavorite(studentProfileId, listingId);
      return { isFavorited: false };
    } else {
      await listingsRepository.createFavorite(studentProfileId, listingId);
      return { isFavorited: true };
    }
  },

  /**
   * Lists paginated saved/favorited listings for a student.
   */
  getFavorites: async (
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ items: ListingFeedItem[]; meta: PaginationMeta }> => {
    const studentProfileId = await listingsRepository.getStudentProfileId(userId);

    if (!studentProfileId) {
      throw new NotFoundError('Student Profile');
    }

    const { favorites, total } = await listingsRepository.findFavoritesByStudent(
      studentProfileId,
      page,
      limit,
    );

    const items = favorites.map((fav) => toListingFeedItem(fav.listing));

    return {
      items,
      meta: { page, limit, total },
    };
  },
};

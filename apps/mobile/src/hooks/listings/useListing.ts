import { useQuery } from '@tanstack/react-query';
import { ListingsApi, ListingDetails } from '../../api/listings.api';

export const useListing = (id?: string) => {
  return useQuery<ListingDetails, Error>({
    queryKey: ['listing', id],
    queryFn: () => {
      if (!id) throw new Error('Listing ID is required');
      return ListingsApi.getListingById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

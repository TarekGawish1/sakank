import { useQuery } from '@tanstack/react-query';
import { ListingsApi, ListingDetails } from '../../api/listings.api';
import { queryKeys } from '../../lib/react-query/queryKeys';

export const useListing = (id?: string) => {
  return useQuery<ListingDetails, Error>({
    queryKey: queryKeys.listings.detail(id || ''),
    queryFn: () => {
      if (!id) throw new Error('Listing ID is required');
      return ListingsApi.getListingById(id);
    },

    enabled: !!id,
  });
};

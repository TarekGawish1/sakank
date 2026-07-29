import { useQuery } from '@tanstack/react-query';
import { ListingsApi, ListingsResponse } from '../../api/listings.api';
import { queryKeys } from '../../lib/react-query/queryKeys';

export const useListings = (params?: any) => {
  return useQuery<ListingsResponse, Error>({
    queryKey: queryKeys.listings.list(params),
    queryFn: () => ListingsApi.getListings(params),

  });
};

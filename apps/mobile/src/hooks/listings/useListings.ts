import { useQuery } from '@tanstack/react-query';
import { ListingsApi, ListingsResponse } from '../../api/listings.api';

export const useListings = (params?: any) => {
  return useQuery<ListingsResponse, Error>({
    queryKey: ['listings', params],
    queryFn: () => ListingsApi.getListings(params),
  });
};

import { useQuery } from '@tanstack/react-query';
import { getFeaturedProperties } from '../services/properties';

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ['properties', 'featured'],
    queryFn: getFeaturedProperties,
  });
};

import { apiClient } from '../lib/api';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
}

export const getFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const response = await apiClient('/v1/listings?limit=10');
    // Map backend ListingFeedItem to frontend Property interface
    const mappedProperties: Property[] = response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.monthlyRent,
      location: `${item.location.area}، ${item.location.city}`,
      beds: item.availableBeds || 1,
      baths: 1, // Add if API has it
      area: 100, // Add if API has it
      image: item.primaryImage || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    }));
    return mappedProperties;
  } catch (error) {
    // Return mock data fallback for development if API is not running
    console.warn('API Failed, using mock data:', error);
    return [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        price: 15000,
        title: 'فيلا فاخرة للإيجار',
        location: 'التجمع الخامس، القاهرة الجديدة',
        beds: 4,
        baths: 3,
        area: 350,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        price: 8500,
        title: 'شقة مفروشة مودرن',
        location: 'الشيخ زايد، الجيزة',
        beds: 2,
        baths: 2,
        area: 120,
      }
    ];
  }
};

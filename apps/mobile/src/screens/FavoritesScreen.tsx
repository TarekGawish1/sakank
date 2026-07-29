import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Heart, HeartCrack } from 'lucide-react-native';
import { Typography } from '../components/ui/Typography';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

// Mock Data for favorites
const MOCK_FAVORITES = [
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    price: 8500,
    title: 'شقة مفروشة مودرن',
    location: 'الشيخ زايد، الجيزة',
    beds: 2,
    baths: 2,
    area: 120,
    isFavorite: true,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    price: 35000,
    title: 'قصر فخم للبيع',
    location: 'بالم هيلز، 6 أكتوبر',
    beds: 6,
    baths: 5,
    area: 850,
    isFavorite: true,
  }
];

export const FavoritesScreen = () => {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <View className="p-24 pt-32 bg-white border-b border-neutrals-200 flex-row items-center justify-between">
        <Typography variant="title-l" color="primary">المفضلة</Typography>
        <Heart size={24} color="#155EEF" fill="#155EEF" />
      </View>

      <ScrollView contentContainerClassName="p-24 pb-[100px] flex-grow">
        {favorites.length === 0 ? (
          <View className="flex-1 items-center justify-center pt-64">
            <View className="w-[80px] h-[80px] bg-neutrals-100 rounded-full items-center justify-center mb-24">
              <HeartCrack size={40} color="#94A3B8" />
            </View>
            <Typography variant="title-m" color="primary" className="mb-8">لا توجد عقارات في المفضلة</Typography>
            <Typography variant="body-m" color="secondary" className="text-center mb-32 px-16 leading-24">
              يبدو أنك لم تقم بإضافة أي عقارات إلى قائمتك المفضلة حتى الآن.
            </Typography>
            <Button 
              label="تصفح العقارات" 
              variant="primary" 
              onPress={() => navigation.navigate('HomeTab')} 
            />
          </View>
        ) : (
          <View className="gap-16">
            <Typography variant="body-m" color="secondary" className="mb-8 text-start">
              لديك {favorites.length} عقار في المفضلة
            </Typography>
            
            {favorites.map(prop => (
              <PropertyCard 
                key={prop.id} 
                image={prop.image}
                price={`${prop.price.toLocaleString()} ج.م`}
                title={prop.title}
                location={prop.location}
                beds={prop.beds}
                baths={prop.baths}
                area={prop.area}
                isFavorite={prop.isFavorite}
                onPress={() => navigation.navigate('PropertyDetails')}
                onFavoritePress={() => {
                  // Simulate removing from favorites
                  setFavorites(prev => prev.filter(p => p.id !== prop.id));
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { useFeaturedProperties } from '../hooks/useProperties';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { data: properties, isLoading, isError } = useFeaturedProperties();

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <ScrollView contentContainerClassName="flex-grow pb-24">
        {/* Header */}
        <View className="flex-row items-center justify-between p-24 pt-32">
          <View className="flex-row items-center gap-12">
            <View className="w-[48px] h-[48px] bg-primary-200 rounded-full items-center justify-center">
              <Typography variant="title-m" color="brand">أ</Typography>
            </View>
            <View>
              <Typography variant="body-m" color="secondary">مرحباً بك 👋</Typography>
              <Typography variant="title-m" color="primary">أحمد محمود</Typography>
            </View>
          </View>
          <View className="w-[40px] h-[40px] bg-white rounded-full items-center justify-center border border-neutrals-200">
            <Bell size={20} color="#0F172A" />
          </View>
        </View>

        {/* Search */}
        <View className="px-24 mb-24">
          <Input 
            placeholder="ابحث عن عقار، منطقة، أو مدينة..." 
            leftIcon={<Search size={20} color="#94A3B8" />}
          />
        </View>

        {/* Categories */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-24 gap-8 mb-24">
            <Button label="الكل" variant="primary" size="sm" className="rounded-full" />
            <Button label="شقق" variant="outline" size="sm" className="rounded-full bg-white" />
            <Button label="فيلات" variant="outline" size="sm" className="rounded-full bg-white" />
            <Button label="مكاتب" variant="outline" size="sm" className="rounded-full bg-white" />
            <Button label="محلات" variant="outline" size="sm" className="rounded-full bg-white" />
          </ScrollView>
        </View>

        {/* Featured Properties */}
        <View className="px-24 gap-16">
          <View className="flex-row items-center justify-between">
            <Typography variant="title-l" color="primary">أحدث العقارات</Typography>
            <Typography variant="label" color="brand">عرض الكل</Typography>
          </View>
          
          <View className="gap-16">
            {isLoading ? (
              <Typography variant="body-m" color="secondary" className="text-center py-24">جاري التحميل...</Typography>
            ) : isError ? (
              <Typography variant="body-m" color="error" className="text-center py-24">حدث خطأ في تحميل العقارات</Typography>
            ) : (
              properties?.map(prop => (
                <PropertyCard 
                  key={prop.id} 
                  image={prop.image}
                  price={`${prop.price.toLocaleString()} ج.م`}
                  title={prop.title}
                  location={prop.location}
                  beds={prop.beds}
                  baths={prop.baths}
                  area={prop.area}
                  onPress={() => navigation.navigate('PropertyDetails')}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

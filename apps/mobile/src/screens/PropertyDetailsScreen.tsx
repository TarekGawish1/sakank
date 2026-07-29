import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowRight, Heart, BedDouble, Bath, Maximize, MapPin, Phone, MessageCircle, Wifi, Car, Wind, ShieldCheck } from 'lucide-react-native';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export const PropertyDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-[120px]">
        {/* Image Header */}
        <View className="relative h-[300px] w-full bg-neutrals-200">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Top Actions */}
          <View className="absolute top-48 w-full flex-row justify-between px-24">
            <TouchableOpacity 
              className="w-[40px] h-[40px] bg-white rounded-full items-center justify-center shadow-sm"
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <ArrowRight size={20} color="#0F172A" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-[40px] h-[40px] bg-white rounded-full items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <Heart size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View className="p-24 bg-white rounded-t-xl -mt-24">
          <View className="flex-row justify-between items-start mb-8">
            <View className="flex-1">
              <Typography variant="title-l" color="primary" className="mb-4 text-start">فيلا فاخرة للإيجار</Typography>
              <View className="flex-row items-center gap-4">
                <MapPin size={16} color="#64748B" />
                <Typography variant="body-m" color="secondary">التجمع الخامس، القاهرة الجديدة</Typography>
              </View>
            </View>
            <View className="items-end ms-16">
              <Typography variant="title-l" color="brand">15,000 ج.م</Typography>
              <Typography variant="body-m" color="secondary">/ شهر</Typography>
            </View>
          </View>

          {/* Specs */}
          <View className="flex-row justify-between items-center py-16 border-b border-neutrals-200 mb-16 mt-8">
            <View className="flex-row items-center gap-8">
              <View className="w-[40px] h-[40px] rounded-full bg-primary-50 items-center justify-center">
                <BedDouble size={20} color="#155EEF" />
              </View>
              <View className="items-start">
                <Typography variant="caption" color="secondary">غرف</Typography>
                <Typography variant="label" color="primary">4 غرف نوم</Typography>
              </View>
            </View>
            <View className="flex-row items-center gap-8">
              <View className="w-[40px] h-[40px] rounded-full bg-primary-50 items-center justify-center">
                <Bath size={20} color="#155EEF" />
              </View>
              <View className="items-start">
                <Typography variant="caption" color="secondary">حمامات</Typography>
                <Typography variant="label" color="primary">3 حمامات</Typography>
              </View>
            </View>
            <View className="flex-row items-center gap-8">
              <View className="w-[40px] h-[40px] rounded-full bg-primary-50 items-center justify-center">
                <Maximize size={20} color="#155EEF" />
              </View>
              <View className="items-start">
                <Typography variant="caption" color="secondary">المساحة</Typography>
                <Typography variant="label" color="primary">350 م²</Typography>
              </View>
            </View>
          </View>

          {/* Amenities */}
          <Typography variant="title-m" color="primary" className="mb-12 text-start">المميزات والخدمات</Typography>
          <View className="flex-row flex-wrap gap-8 mb-24">
            <View className="flex-row items-center gap-8 bg-neutrals-50 px-12 py-8 rounded-full border border-neutrals-200">
              <Wifi size={16} color="#475569" />
              <Typography variant="label" color="secondary">واي فاي مجاني</Typography>
            </View>
            <View className="flex-row items-center gap-8 bg-neutrals-50 px-12 py-8 rounded-full border border-neutrals-200">
              <Car size={16} color="#475569" />
              <Typography variant="label" color="secondary">موقف سيارات</Typography>
            </View>
            <View className="flex-row items-center gap-8 bg-neutrals-50 px-12 py-8 rounded-full border border-neutrals-200">
              <Wind size={16} color="#475569" />
              <Typography variant="label" color="secondary">تكييف مركزي</Typography>
            </View>
            <View className="flex-row items-center gap-8 bg-neutrals-50 px-12 py-8 rounded-full border border-neutrals-200">
              <ShieldCheck size={16} color="#475569" />
              <Typography variant="label" color="secondary">حراسة 24/7</Typography>
            </View>
          </View>

          {/* Description */}
          <Typography variant="title-m" color="primary" className="mb-8 text-start">الوصف</Typography>
          <Typography variant="body-m" color="secondary" className="mb-24 text-start leading-[24px]">
            فيلا فاخرة للإيجار في أرقى مناطق التجمع الخامس، تشطيب سوبر لوكس، مكيفة بالكامل. تتكون من 4 غرف نوم، 3 حمامات، ريسبشن 4 قطع، مطبخ مجهز وحمام سباحة خاص. الموقع مميز جداً بالقرب من جميع الخدمات.
          </Typography>

          {/* Agent Info */}
          <View className="flex-row items-center justify-between p-16 bg-primary-50 rounded-lg border border-primary-100 mb-24">
            <View className="flex-row items-center gap-12">
              <View className="w-[48px] h-[48px] bg-primary-200 rounded-full items-center justify-center">
                <Typography variant="title-m" color="brand">م</Typography>
              </View>
              <View className="items-start">
                <Typography variant="label" color="primary">محمد علي</Typography>
                <Typography variant="caption" color="secondary">مستشار عقاري</Typography>
              </View>
            </View>
            <View className="flex-row gap-8">
              <View className="w-[36px] h-[36px] bg-white rounded-full items-center justify-center border border-neutrals-200">
                <MessageCircle size={16} color="#155EEF" />
              </View>
              <View className="w-[36px] h-[36px] bg-white rounded-full items-center justify-center border border-neutrals-200">
                <Phone size={16} color="#155EEF" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Action Bar */}
      <View className="absolute bottom-0 w-full bg-white border-t border-neutrals-200 p-24 flex-row gap-16 pb-32">
        <Button 
          label="اتصال" 
          variant="primary" 
          className="flex-1"
          leftIcon={<Phone size={18} color="#FFFFFF" />}
        />
        <Button 
          label="واتساب" 
          variant="primary" 
          className="flex-1 bg-[#25D366] active:bg-[#1DA851]" 
          leftIcon={<MessageCircle size={18} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
};

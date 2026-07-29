import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'ابحث عن سكنك بسهولة',
    description: 'نوفر لك آلاف الخيارات من الشقق والمساكن الطلابية القريبة من جامعتك.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'تفاصيل دقيقة وواضحة',
    description: 'تصفح صور العقار، المواصفات، والخدمات المتاحة لتتأكد من اختيارك الأنسب.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'احجز مكانك بضغطة زر',
    description: 'تواصل مع المالك مباشرة أو قم بحجز السكن والدفع أونلاين بخطوات بسيطة وآمنة.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1e52409818?q=80&w=2070&auto=format&fit=crop',
  }
];

export const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
    navigation.replace('MainTabs');
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      completeOnboarding();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={{ width }} className="flex-1 items-center justify-center p-24">
            <View className="w-full h-[350px] rounded-[32px] overflow-hidden mb-48">
              <Image source={{ uri: slide.image }} className="w-full h-full" resizeMode="cover" />
            </View>
            <Typography variant="h1" color="primary" className="text-center mb-16">{slide.title}</Typography>
            <Typography variant="body-m" color="secondary" className="text-center leading-[24px]">
              {slide.description}
            </Typography>
          </View>
        ))}
      </ScrollView>

      {/* Pagination & Controls */}
      <View className="p-24 pb-48">
        <View className="flex-row justify-center gap-8 mb-32">
          {SLIDES.map((_, index) => (
            <View 
              key={index} 
              className={`h-8 rounded-full ${currentIndex === index ? 'w-32 bg-primary-500' : 'w-8 bg-neutrals-200'}`} 
            />
          ))}
        </View>

        <View className="flex-row items-center gap-16">
          {currentIndex < SLIDES.length - 1 && (
            <View className="flex-1">
              <Button label="تخطي" variant="outline" onPress={completeOnboarding} />
            </View>
          )}
          <View className="flex-1">
            <Button 
              label={currentIndex === SLIDES.length - 1 ? 'ابدأ الآن' : 'التالي'} 
              variant="primary" 
              onPress={handleNext} 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

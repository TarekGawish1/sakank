import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal, Clock, X } from 'lucide-react-native';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const RECENT_SEARCHES = [
    'التجمع الخامس',
    'شقق مفروشة',
    'الشيخ زايد',
    'مدينة نصر'
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      {/* Header / Search Area */}
      <View className="p-24 pt-32 bg-white border-b border-neutrals-200">
        <Typography variant="title-l" color="primary" className="mb-16 text-start">ابحث عن عقارك</Typography>
        <View className="flex-row items-center gap-12">
          <View className="flex-1">
            <Input 
              placeholder="المنطقة، المدينة، أو رقم العقار..." 
              leftIcon={<Search size={20} color="#94A3B8" />}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="w-[48px] h-[48px] bg-primary-50 rounded-lg items-center justify-center border border-primary-100">
            <SlidersHorizontal size={20} color="#155EEF" />
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-16" contentContainerClassName="gap-8">
          <View className="px-16 py-8 bg-brand-50 rounded-full border border-brand-200 flex-row items-center gap-4">
            <Typography variant="label" color="brand">للإيجار</Typography>
            <X size={14} color="#155EEF" />
          </View>
          <View className="px-16 py-8 bg-brand-50 rounded-full border border-brand-200 flex-row items-center gap-4">
            <Typography variant="label" color="brand">شقق</Typography>
            <X size={14} color="#155EEF" />
          </View>
        </ScrollView>
      </View>

      <ScrollView contentContainerClassName="p-24 gap-24 flex-grow">
        {/* Recent Searches */}
        {!searchQuery && (
          <View>
            <View className="flex-row justify-between items-center mb-16">
              <Typography variant="title-m" color="primary">عمليات البحث الأخيرة</Typography>
              <Typography variant="label" color="secondary">مسح الكل</Typography>
            </View>
            <View className="gap-16">
              {RECENT_SEARCHES.map((search, index) => (
                <View key={index} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-12">
                    <Clock size={16} color="#94A3B8" />
                    <Typography variant="body-m" color="primary">{search}</Typography>
                  </View>
                  <X size={16} color="#94A3B8" />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Search Results / Map Placeholder */}
        {searchQuery && (
          <View className="flex-1 items-center justify-center pt-64">
            <Search size={48} color="#CBD5E1" className="mb-16" />
            <Typography variant="title-m" color="secondary">جاري البحث...</Typography>
            <Typography variant="body-m" color="tertiary">سيتم ربطها بالـ API قريباً</Typography>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

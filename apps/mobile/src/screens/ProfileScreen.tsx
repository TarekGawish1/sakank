import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { User, Home, ClipboardList, Settings, HelpCircle, LogOut, ChevronLeft } from 'lucide-react-native';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

// Reusable Menu Item Component
const ProfileMenuItem = ({ icon, title, isDestructive = false, onPress }: any) => (
  <TouchableOpacity 
    className="flex-row items-center justify-between p-16 bg-white border-b border-neutrals-100"
    onPress={onPress}
  >
    <View className="flex-row items-center gap-12">
      {icon}
      <Typography variant="body-m" color={isDestructive ? 'error' : 'primary'} className="mt-4">
        {title}
      </Typography>
    </View>
    <ChevronLeft size={20} color={isDestructive ? '#F04438' : '#94A3B8'} />
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <ScrollView contentContainerClassName="pb-[100px] flex-grow">
        
        {/* Profile Header */}
        <View className="bg-white p-24 pt-48 items-center border-b border-neutrals-200 mb-24">
          <View className="w-[100px] h-[100px] bg-primary-100 rounded-full items-center justify-center mb-16 border-4 border-primary-50">
            <Typography variant="h1" color="brand" className="text-[40px] mt-8">أ</Typography>
          </View>
          <Typography variant="title-l" color="primary" className="mb-4">أحمد محمود</Typography>
          <Typography variant="body-m" color="secondary" className="mb-16">ahmed@example.com</Typography>
          <Button label="تعديل البيانات" variant="outline" size="sm" className="px-32 rounded-full" />
        </View>

        {/* Menu Items */}
        <View className="bg-white border-t border-b border-neutrals-200 mb-24">
          <ProfileMenuItem 
            icon={<User size={22} color="#64748B" />} 
            title="المعلومات الشخصية" 
          />
          <ProfileMenuItem 
            icon={<Home size={22} color="#64748B" />} 
            title="عقاراتي" 
          />
          <ProfileMenuItem 
            icon={<ClipboardList size={22} color="#64748B" />} 
            title="طلبات السكن" 
          />
        </View>

        <View className="bg-white border-t border-b border-neutrals-200 mb-24">
          <ProfileMenuItem 
            icon={<Settings size={22} color="#64748B" />} 
            title="الإعدادات" 
          />
          <ProfileMenuItem 
            icon={<HelpCircle size={22} color="#64748B" />} 
            title="المساعدة والدعم" 
          />
        </View>

        <View className="bg-white border-t border-b border-neutrals-200 mb-24">
          <ProfileMenuItem 
            icon={<LogOut size={22} color="#F04438" />} 
            title="تسجيل الخروج" 
            isDestructive={true}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

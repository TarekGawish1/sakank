import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Heart, BedDouble, Bath, Maximize } from 'lucide-react-native';
import { Typography } from './Typography';
import { Card } from './Card';

export interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  price,
  title,
  location,
  beds,
  baths,
  area,
  isFavorite = false,
  onPress,
  onFavoritePress,
  className = '',
}) => {
  return (
    <Card 
      className={`p-0 overflow-hidden ${className}`} 
      onPress={onPress}
    >
      <View className="relative">
        <Image 
          source={{ uri: image }} 
          className="w-full h-[160px] bg-neutrals-200" 
          resizeMode="cover" 
        />
        <TouchableOpacity 
          className="absolute top-12 left-12 w-[32px] h-[32px] bg-white rounded-full items-center justify-center shadow-sm"
          onPress={onFavoritePress}
          activeOpacity={0.8}
        >
          <Heart 
            size={18} 
            color={isFavorite ? "#F04438" : "#64748B"} 
            fill={isFavorite ? "#F04438" : "transparent"} 
          />
        </TouchableOpacity>
      </View>
      
      <View className="p-16 gap-8">
        <Typography variant="title-l" color="brand">
          {price} <Typography variant="body-m" color="secondary">/ شهر</Typography>
        </Typography>
        
        <View>
          <Typography variant="title-m" color="primary" numberOfLines={1}>
            {title}
          </Typography>
          <Typography variant="body-m" color="secondary" numberOfLines={1}>
            {location}
          </Typography>
        </View>

        <View className="flex-row items-center gap-16 mt-8">
          <View className="flex-row items-center gap-4">
            <BedDouble size={16} color="#64748B" />
            <Typography variant="label" color="tertiary">{beds}</Typography>
          </View>
          <View className="flex-row items-center gap-4">
            <Bath size={16} color="#64748B" />
            <Typography variant="label" color="tertiary">{baths}</Typography>
          </View>
          <View className="flex-row items-center gap-4">
            <Maximize size={16} color="#64748B" />
            <Typography variant="label" color="tertiary">{area} م²</Typography>
          </View>
        </View>
      </View>
    </Card>
  );
};

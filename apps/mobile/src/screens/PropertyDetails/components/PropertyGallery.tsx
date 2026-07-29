import React from 'react';
import { View, Image, StyleSheet, Pressable, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme';
import { AppIcon } from '../../../components';
import { ListingDetails } from '../../../api/listings.api';
import { useToggleFavorite } from '../../../hooks/favorites';

interface PropertyGalleryProps {
  listing: ListingDetails;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ listing }) => {
  const navigation = useNavigation();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const firstImage = listing.images?.[0];
  const imageUri = (typeof firstImage === 'string' ? firstImage : firstImage?.url) || listing.primaryImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUri }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
        >
          <AppIcon name="ChevronLeft" size="md" color="primary" />
        </Pressable>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => toggleFavorite(listing.id)}
        >
          <AppIcon 
            name="Heart" 
            size="md" 
            color={(listing as any).isFavorited ? 'error' : 'primary'} 
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: '100%',
    position: 'relative',
    backgroundColor: theme.colors.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight! + theme.spacing[16] : theme.spacing[48],
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[24],
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceDefault,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  }
});

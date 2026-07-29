import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../AppText';
import { AppIcon } from '../AppIcon';

export interface ListingCardProps {
  image: string;
  title: string;
  location: string;
  price: number | string;
  currency?: string;
  rating?: number;
  featured?: boolean;
  favorite?: boolean;
  available?: boolean;
  imageAspectRatio?: number;
  onFavoritePress?: () => void;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  image,
  title,
  location,
  price,
  currency = 'ريال',
  rating,
  featured,
  favorite,
  available = true,
  imageAspectRatio = 1,
  onFavoritePress,
  onPress,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!available}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.imageContainer, { aspectRatio: imageAspectRatio }]}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        
        <View style={styles.topLeftOverlay}>
          {featured && (
            <View style={styles.featuredBadge}>
              <AppText variant="caption" style={styles.featuredText}>مميز</AppText>
            </View>
          )}
        </View>

        {onFavoritePress && (
          <Pressable
            onPress={onFavoritePress}
            style={styles.favoriteButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="أضف للمفضلة"
          >
            <AppIcon
              name="Heart"
              size="md"
              color={favorite ? 'error' : 'inverse'}
            />
          </Pressable>
        )}

        {!available && (
          <View style={styles.unavailableOverlay}>
            <AppText variant="label" color="inverse">غير متوفر</AppText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <AppText variant="bodySm" color="textPrimary" numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          <View style={styles.ratingBox}>
            <AppIcon name="Star" size="xs" color="textPrimary" />
            <AppText variant="caption" color="textPrimary" style={styles.ratingText}>
              {rating !== undefined ? rating : '5.0'}
            </AppText>
          </View>
        </View>

        <AppText variant="caption" color="textSecondary" numberOfLines={1} style={styles.location}>
          {location}
        </AppText>

        <View style={styles.priceRow}>
          <AppText variant="bodySm" color="textPrimary" style={styles.price}>
            {price}
          </AppText>
          <AppText variant="bodySm" color="textPrimary">
             {' '}{currency} / شهر
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    gap: theme.spacing[8],
  },
  pressed: {
    opacity: 0.97,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.colors.surfaceNeutral,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topLeftOverlay: {
    position: 'absolute',
    top: theme.spacing[12],
    left: theme.spacing[12],
  },
  featuredBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.radius.full,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  featuredText: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing[12],
    right: theme.spacing[12],
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: 2,
    paddingHorizontal: theme.spacing[2],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginRight: theme.spacing[8],
    fontWeight: '700',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontWeight: '500',
  },
  location: {
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  price: {
    fontWeight: '700',
  }
});

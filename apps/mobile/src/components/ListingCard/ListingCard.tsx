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
              <AppText variant="caption" weight="bold" color="textPrimary">مميز</AppText>
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
            <AppText variant="label" color="textInverse">غير متوفر</AppText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <AppText variant="bodySm" color="textPrimary" weight="bold" numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          <View style={styles.ratingBox}>
            <AppIcon name="Star" size="xs" color="warning" />
            <AppText variant="caption" color="textPrimary" weight="medium">
              {rating !== undefined ? rating : '5.0'}
            </AppText>
          </View>
        </View>

        <AppText variant="caption" color="textSecondary" numberOfLines={1} style={styles.location}>
          {location}
        </AppText>

        <View style={styles.priceRow}>
          <AppText variant="bodySm" color="textPrimary" weight="bold">
            {price}
          </AppText>
          <AppText variant="bodySm" color="textSecondary">
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
    backgroundColor: theme.colors.surfaceMuted,
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
    backgroundColor: theme.colors.surfaceDefault,
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.radius.full,
    ...theme.elevation.sm,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing[12],
    right: theme.spacing[12],
    ...theme.elevation.md,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.palette.neutral1000,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: theme.spacing[2],
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
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  location: {
    marginTop: theme.spacing[2],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: theme.spacing[4],
  },
});

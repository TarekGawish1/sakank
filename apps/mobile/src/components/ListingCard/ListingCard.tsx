import React from 'react';
import { View, Image, StyleSheet, Pressable, I18nManager } from 'react-native';
import { theme } from '../../theme';
import { Card, CardBody, CardFooter } from '../Card';
import { AppText } from '../AppText';
import { AppIcon } from '../AppIcon';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';

export interface ListingCardProps {
  image: string;
  title: string;
  location: string;
  price: number | string;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  ownerName: string;
  ownerAvatar?: string;
  verifiedOwner?: boolean;
  featured?: boolean;
  favorite?: boolean;
  available?: boolean;
  onFavoritePress?: () => void;
  onPress?: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
  accessibilityLabel?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  image,
  title,
  location,
  price,
  currency = 'ريال',
  rating,
  reviewCount,
  ownerName,
  ownerAvatar,
  verifiedOwner,
  featured,
  favorite,
  available = true,
  onFavoritePress,
  onPress,
  actionLabel,
  onActionPress,
  accessibilityLabel,
}) => {
  const isRTL = I18nManager.isRTL;

  return (
    <Card
      variant="elevated"
      padding="none"
      pressable
      onPress={onPress}
      disabled={!available}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={styles.card}
    >
      {/* Top Cover Image Area */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        
        {/* Overlay Content */}
        <View style={styles.overlay}>
          <View style={styles.overlayTop}>
            {featured ? (
              <Badge label="مميز" variant="brand" appearance="solid" size="sm" />
            ) : (
              <View /> // Spacer if not featured
            )}

            {onFavoritePress && (
              <Pressable
                onPress={onFavoritePress}
                style={styles.favoriteButton}
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
          </View>

          {!available && (
            <View style={styles.unavailableOverlay}>
              <Badge label="غير متوفر" variant="neutral" appearance="solid" />
            </View>
          )}
        </View>
      </View>

      {/* Body Area */}
      <CardBody padding="md" style={styles.body}>
        {/* Header: Title & Location */}
        <View style={styles.headerRow}>
          <View style={styles.titleCol}>
            <AppText variant="title2" color="textPrimary" numberOfLines={1}>
              {title}
            </AppText>
            <AppText variant="bodySm" color="textSecondary" numberOfLines={1} style={styles.location}>
              {location}
            </AppText>
          </View>
          <View style={styles.priceCol}>
            <AppText variant="title2" color="textBrand">
              {price}
            </AppText>
            <AppText variant="caption" color="textSecondary">
              {currency} / شهر
            </AppText>
          </View>
        </View>

        {/* Footer: Rating & Owner */}
        <View style={styles.infoRow}>
          {rating !== undefined ? (
            <View style={styles.ratingBox}>
              <AppIcon name="Star" size="sm" color="warning" />
              <AppText variant="label" color="textPrimary">
                {rating}
              </AppText>
              {reviewCount !== undefined && (
                <AppText variant="caption" color="textSecondary">
                  ({reviewCount})
                </AppText>
              )}
            </View>
          ) : (
            <View />
          )}

          <View style={styles.ownerBox}>
            <AppText variant="caption" color="textSecondary">
              {ownerName}
            </AppText>
            <Avatar
              initials={ownerName}
              source={ownerAvatar ? { uri: ownerAvatar } : undefined}
              size="xs"
              verified={verifiedOwner}
              style={styles.avatar}
            />
          </View>
        </View>
      </CardBody>

      {/* Action Footer */}
      {actionLabel && onActionPress && (
        <CardFooter padding="md" style={styles.footer}>
          <Button
            title={actionLabel}
            onPress={onActionPress}
            size="medium"
            hierarchy="secondary"
            style={styles.actionBtn}
          />
        </CardFooter>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill as any,
    padding: theme.spacing[12],
    justifyContent: 'space-between',
  },
  overlayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: theme.spacing[8],
    borderRadius: theme.radius.full,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    gap: theme.spacing[12],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleCol: {
    flex: 1,
    marginRight: theme.spacing[8],
  },
  location: {
    marginTop: theme.spacing[2],
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing[4],
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  ownerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[8],
  },
  avatar: {
    marginLeft: theme.spacing[4],
  },
  footer: {
    paddingTop: 0,
  },
  actionBtn: {
    flex: 1,
  },
});

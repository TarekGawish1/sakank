import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../AppText';
import { AppIcon } from '../AppIcon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline';

export interface AvatarProps {
  source?: ImageSourcePropType;
  initials?: string;
  size?: AvatarSize;
  verified?: boolean;
  status?: AvatarStatus;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const getSizeValue = (size: AvatarSize): number => {
  switch (size) {
    case 'xs': return 24;
    case 'sm': return 32;
    case 'md': return 48;
    case 'lg': return 64;
    case 'xl': return 96;
    default: return 48;
  }
};

const getTypographyVariant = (size: AvatarSize) => {
  switch (size) {
    case 'xs': return 'caption';
    case 'sm': return 'label';
    case 'md': return 'title1';
    case 'lg': return 'headline';
    case 'xl': return 'display';
    default: return 'title1';
  }
};

const getIconSize = (size: AvatarSize): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  switch (size) {
    case 'xs': return 'xs';
    case 'sm': return 'sm';
    case 'md': return 'md';
    case 'lg': return 'lg';
    case 'xl': return 'xl';
    default: return 'md';
  }
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'md',
  verified,
  status,
  style,
  accessibilityLabel,
}) => {
  const [hasError, setHasError] = useState(false);
  const numericSize = getSizeValue(size);
  const borderRadius = numericSize / 2;

  const renderContent = () => {
    if (source && !hasError) {
      return (
        <Image
          source={source}
          style={{ width: numericSize, height: numericSize, borderRadius }}
          onError={() => setHasError(true)}
        />
      );
    }

    if (initials) {
      return (
        <View style={[styles.fallbackContainer, { width: numericSize, height: numericSize, borderRadius }]}>
          <AppText variant={getTypographyVariant(size)} color="textPrimary" weight="medium">
            {initials.substring(0, 2).toUpperCase()}
          </AppText>
        </View>
      );
    }

    return (
      <View style={[styles.fallbackContainer, { width: numericSize, height: numericSize, borderRadius }]}>
        <AppIcon name="User" size={getIconSize(size)} color="tertiary" />
      </View>
    );
  };

  const getStatusColor = () => {
    if (status === 'online') return theme.colors.success;
    return theme.colors.textTertiary;
  };

  const statusSize = Math.max(10, numericSize * 0.25);
  const statusBorderWidth = numericSize > 40 ? 2 : 1.5;

  return (
    <View
      style={[styles.container, { width: numericSize, height: numericSize }, style]}
      accessible={true}
      accessibilityLabel={accessibilityLabel || 'User Avatar'}
    >
      {renderContent()}

      {status && (
        <View
          style={[
            styles.indicator,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor: getStatusColor(),
              borderWidth: statusBorderWidth,
            }
          ]}
        />
      )}

      {verified && (
        <View style={styles.verifiedBadge}>
          <AppIcon name="BadgeCheck" size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} color="primary" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackContainer: {
    backgroundColor: theme.colors.surfaceSubdued,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: theme.colors.surfaceDefault,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: theme.radius.full,
    padding: 2,
  },
});

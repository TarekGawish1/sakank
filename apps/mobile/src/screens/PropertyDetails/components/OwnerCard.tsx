import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Card, CardBody, AppIcon, Button } from '../../../components';
import { ListingDetails } from '../../../api/listings.api';

interface OwnerCardProps {
  listing: ListingDetails;
  isLoggedIn?: boolean;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({ listing, isLoggedIn = false }) => {
  if (!listing.owner) return null;

  return (
    <View style={styles.container}>
      <Card variant="elevated" radius="lg">
        <CardBody style={styles.cardBody}>
          {/* Blurred/Faded Content */}
          <View style={[styles.contentWrapper, !isLoggedIn && styles.blurredContent]}>
            <View style={styles.header}>
              <Image 
                source={{ uri: listing.owner.avatar || 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.avatar} 
              />
              <View style={styles.info}>
                <View style={styles.nameRow}>
                  <AppText variant="label" color="textPrimary" weight="bold">
                    {listing.owner.name || `${(listing.owner as any).firstName || ''} ${(listing.owner as any).lastName || ''}`.trim() || 'المالك'}
                  </AppText>
                  <AppIcon name="BadgeCheck" size="sm" color="success" />
                </View>
                <AppText variant="caption" color="textSecondary">
                  تقييم: {listing.owner.rating || '4.9'} • استجابة: {listing.owner.responseRate || '100%'}
                </AppText>
              </View>
            </View>
            
            <View style={styles.actions}>
              <Button 
                title="مراسلة" 
                hierarchy="secondary" 
                size="medium"
                style={styles.actionBtn}
                leadingIcon={<AppIcon name="MessageCircle" size="sm" color="primary" />}
                onPress={() => {}} 
              />
              <Button 
                title="اتصال" 
                hierarchy="primary" 
                size="medium"
                style={styles.actionBtn}
                leadingIcon={<AppIcon name="Phone" size="sm" color="inverse" />}
                onPress={() => {}} 
              />
            </View>
          </View>

          {/* Glassmorphism Overlay */}
          {!isLoggedIn && (
            <View style={styles.overlay}>
              <View style={styles.overlayContent}>
                <AppIcon name="Lock" size="md" color="primary" />
                <AppText variant="label" weight="bold" color="textPrimary" style={styles.overlayText}>
                  قم بتسجيل الدخول للتواصل مع المالك
                </AppText>
              </View>
            </View>
          )}
        </CardBody>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[24],
    paddingBottom: theme.spacing[40],
  },
  cardBody: {
    position: 'relative',
    overflow: 'hidden',
    padding: 0, // Removing padding here, handling it in contentWrapper
  },
  contentWrapper: {
    padding: theme.spacing[16],
    gap: theme.spacing[16],
  },
  blurredContent: {
    opacity: 0.2, // Simulate blur by reducing opacity behind the glass
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayContent: {
    alignItems: 'center',
    gap: theme.spacing[8],
    paddingHorizontal: theme.spacing[16],
  },
  overlayText: {
    marginBottom: theme.spacing[8],
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[12],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceMuted,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing[12],
  },
  actionBtn: {
    flex: 1,
  }
});

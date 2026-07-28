import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { theme } from '../../../../theme';
import { AppText, Card, CardBody, AppIcon, Button } from '../../../../components';

export const OwnerCard = () => {
  return (
    <View style={styles.container}>
      <Card variant="elevated" radius="lg">
        <CardBody style={styles.cardBody}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
              style={styles.avatar} 
            />
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <AppText variant="label" color="textPrimary" weight="bold">أحمد عبدالله</AppText>
                <AppIcon name="BadgeCheck" size="sm" color="success" />
              </View>
              <AppText variant="caption" color="textSecondary">
                عضو منذ 2021 • 15 عقار
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
    padding: theme.spacing[16],
    gap: theme.spacing[16],
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

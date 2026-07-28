import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Card, CardBody, Button, AppIcon } from '../../../components';
import { StatusBadge, RequestStatus } from './StatusBadge';

interface RequestCardProps {
  id: string;
  image: string;
  title: string;
  address: string;
  requestedDate: string;
  moveInDate: string;
  price: string;
  status: RequestStatus;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  image,
  title,
  address,
  requestedDate,
  moveInDate,
  price,
  status
}) => {
  return (
    <Card variant="outlined" radius="lg" style={styles.card}>
      <CardBody style={styles.body}>
        <View style={styles.header}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <AppText variant="bodySm" weight="bold" color="textPrimary" numberOfLines={1} style={styles.title}>
                {title}
              </AppText>
              <StatusBadge status={status} />
            </View>
            <AppText variant="caption" color="textSecondary" numberOfLines={1} style={styles.address}>
              {address}
            </AppText>
            
            <View style={styles.priceRow}>
              <AppText variant="label" weight="bold" color="brandPrimary">
                {price} ريال
              </AppText>
              <AppText variant="caption" color="textSecondary">
                {' '} / شهر
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.datesRow}>
          <View style={styles.dateItem}>
            <AppText variant="caption" color="textSecondary">تاريخ الطلب</AppText>
            <AppText variant="label" color="textPrimary" weight="medium">{requestedDate}</AppText>
          </View>
          <View style={styles.dateItem}>
            <AppText variant="caption" color="textSecondary">تاريخ السكن</AppText>
            <AppText variant="label" color="textPrimary" weight="medium">{moveInDate}</AppText>
          </View>
        </View>

        <View style={styles.actions}>
          {status === 'pending' && (
            <Button 
              title="إلغاء الطلب" 
              hierarchy="secondary" 
              size="small"
              style={styles.actionBtn}
              onPress={() => {}} 
            />
          )}
          <Button 
            title="عرض التفاصيل" 
            hierarchy={status === 'pending' ? 'primary' : 'secondary'} 
            size="small"
            style={styles.actionBtn}
            onPress={() => {}} 
          />
        </View>
      </CardBody>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing[16],
  },
  body: {
    padding: theme.spacing[16],
    gap: theme.spacing[16],
  },
  header: {
    flexDirection: 'row',
    gap: theme.spacing[12],
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing[8],
  },
  title: {
    flex: 1,
  },
  address: {
    marginTop: 4,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing[12],
    marginTop: theme.spacing[4],
  },
  actionBtn: {
    flex: 1,
  }
});

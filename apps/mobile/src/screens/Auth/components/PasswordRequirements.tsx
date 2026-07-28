import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon, Card, CardBody } from '../../../components';

interface Requirement {
  id: string;
  label: string;
  isMet: boolean;
}

export const PasswordRequirements = () => {
  const requirements: Requirement[] = [
    { id: 'length', label: '8 أحرف كحد أدنى', isMet: true },
    { id: 'upper', label: 'حرف كبير (A-Z)', isMet: false },
    { id: 'lower', label: 'حرف صغير (a-z)', isMet: true },
    { id: 'number', label: 'رقم (0-9)', isMet: false },
    { id: 'special', label: 'رمز خاص (!@#$%)', isMet: false },
  ];

  return (
    <Card variant="outlined" radius="md" style={styles.card}>
      <CardBody style={styles.body}>
        <AppText variant="label" weight="bold" color="textPrimary">
          متطلبات كلمة المرور:
        </AppText>
        <View style={styles.list}>
          {requirements.map(req => (
            <View key={req.id} style={styles.item}>
              <AppIcon 
                name={req.isMet ? 'Check' : 'Minus'} 
                size="xs" 
                color={req.isMet ? 'success' : 'tertiary'} 
              />
              <AppText 
                variant="caption" 
                color={req.isMet ? 'textPrimary' : 'textTertiary'}
              >
                {req.label}
              </AppText>
            </View>
          ))}
        </View>
      </CardBody>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceSubdued,
    borderColor: theme.colors.borderSubtle,
  },
  body: {
    padding: theme.spacing[16],
    gap: theme.spacing[12],
  },
  list: {
    gap: theme.spacing[8],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[8],
  }
});

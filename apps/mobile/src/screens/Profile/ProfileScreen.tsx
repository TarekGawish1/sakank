import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSession } from '../../hooks/auth/useSession';
import { AppText, Avatar, Button, Spinner, AppIcon } from '../../components';
import { theme } from '../../theme';

export const ProfileScreen = () => {
  const { user, isLoadingSession, isSessionError, logout, isLoggingOut } = useSession();

  if (isLoadingSession) {
    return (
      <View style={styles.centerContainer}>
        <Spinner size="lg" />
      </View>
    );
  }

  if (isSessionError || !user) {
    return (
      <View style={styles.centerContainer}>
        <AppText color="error">فشل في تحميل بيانات الحساب</AppText>
      </View>
    );
  }

  const fullName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : 'مستخدم جديد';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Avatar initials={fullName.substring(0, 2)} size="xl" />
        <AppText variant="title2" style={styles.name}>{fullName}</AppText>
        <AppText variant="body" color="textSecondary">
          {user.role === 'STUDENT' ? 'طالب' : 'صاحب عقار'}
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle" style={styles.sectionTitle}>المعلومات الشخصية</AppText>
        
        {user.email && (
          <View style={styles.infoRow}>
            <AppIcon name="Mail" size="sm" color="tertiary" />
            <AppText variant="body">{user.email}</AppText>
          </View>
        )}

        {user.phone && (
          <View style={styles.infoRow}>
            <AppIcon name="Phone" size="sm" color="tertiary" />
            <AppText variant="body">{user.phone}</AppText>
          </View>
        )}

        {user.gender && (
          <View style={styles.infoRow}>
            <AppIcon name="User" size="sm" color="tertiary" />
            <AppText variant="body">
              {user.gender === 'MALE' ? 'ذكر' : user.gender === 'FEMALE' ? 'أنثى' : user.gender}
            </AppText>
          </View>
        )}
      </View>

      <Button
        title="تسجيل الخروج"
        variant="outline"
        onPress={() => logout()}
        loading={isLoggingOut}
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceBackground,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceBackground,
  },
  content: {
    padding: theme.spacing[16],
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing[32],
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing[16],
  },
  name: {
    marginTop: theme.spacing[16],
    marginBottom: theme.spacing[4],
  },
  section: {
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[16],
    marginBottom: theme.spacing[24],
  },
  sectionTitle: {
    marginBottom: theme.spacing[16],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[12],
    paddingVertical: theme.spacing[12],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  logoutButton: {
    marginTop: 'auto',
  },
});

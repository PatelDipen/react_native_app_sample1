import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper, InsuranceCard, CustomText } from '@/components';
import { useCurrentUser } from '@/hooks/api/useAuth';
import { useInsuranceWithClaims } from '@/hooks/api/useInsurance';

export default function HomeMain() {
  const { data: user, error: userError } = useCurrentUser();
  const { data: insurances, error: insuranceError } = useInsuranceWithClaims();

  return (
    <ScreenWrapper headerTitle="Home" scrollable>
      <View style={styles.container}>
        {/* User Profile Section */}
        {userError ? (
          <Text style={styles.errorText}>Error loading profile</Text>
        ) : user ? (
          <View style={styles.profileSection}>
            <Text style={styles.welcomeText}>
              Welcome, {user.firstName} {user.lastName}!
            </Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </View>
        ) : (
          <Text style={styles.text}>Welcome to Home Screen</Text>
        )}

        {/* Insurance Section */}
        <View style={styles.insuranceSection}>
          <CustomText style={styles.sectionTitle}>My Insurances</CustomText>

          {insuranceError ? (
            <Text style={styles.errorText}>Error loading insurances</Text>
          ) : insurances && insurances.length > 0 ? (
            insurances.map((insurance) => (
              <InsuranceCard key={insurance.insuranceId} insurance={insurance} />
            ))
          ) : (
            <CustomText style={styles.emptyText}>No insurances found</CustomText>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  insuranceSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

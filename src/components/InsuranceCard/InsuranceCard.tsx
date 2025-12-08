import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CustomText } from '@/components';
import { InsuranceWithClaim } from '@/types/insurance';

interface InsuranceCardProps {
  insurance: InsuranceWithClaim;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ insurance }) => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <CustomText style={styles.title}>{insurance.name}</CustomText>
        <CustomText style={styles.id}>ID: {insurance.insuranceId}</CustomText>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <CustomText style={styles.label}>Insured Sum:</CustomText>
        <CustomText style={styles.value}>
          {formatCurrency(insurance.insuredSum)}
        </CustomText>
      </View>

      <View style={styles.row}>
        <CustomText style={styles.label}>Claimed Amount:</CustomText>
        <CustomText style={[styles.value, styles.claimedText]}>
          {formatCurrency(insurance.claimedAmount)}
        </CustomText>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <CustomText style={styles.labelBold}>Remaining Sum:</CustomText>
        <CustomText style={[styles.value, styles.remainingText]}>
          {formatCurrency(insurance.remainingSum)}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  labelBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  claimedText: {
    color: '#e74c3c',
  },
  remainingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});

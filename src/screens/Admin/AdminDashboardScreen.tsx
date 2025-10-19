import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProducts, fetchCategories } from '../../redux/slices/productSlice';
import { Card } from '../../components/Card';

export default function AdminDashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { products, categories, isLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleManageProducts = () => {
    navigation.navigate('AdminProducts' as never);
  };

  const handleManageOrders = () => {
    navigation.navigate('AdminOrders' as never);
  };

  const handleManageCategories = () => {
    // Navigate to categories management
    // This would be implemented in a real app
  };

  const renderStatsCard = (title: string, value: string, icon: string, color: string) => (
    <Card style={styles.statsCard}>
      <View style={styles.statsContent}>
        <View style={[styles.statsIcon, { backgroundColor: color }]}>
          <Ionicons name={icon as any} size={24} color="#ffffff" />
        </View>
        <View style={styles.statsInfo}>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
        </View>
      </View>
    </Card>
  );

  const renderQuickAction = (title: string, description: string, icon: string, onPress: () => void) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={styles.actionContent}>
        <View style={styles.actionIcon}>
          <Ionicons name={icon as any} size={24} color="#2ecc71" />
        </View>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDescription}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Manage your store</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          {renderStatsCard('Total Products', products.length.toString(), 'cube-outline', '#2ecc71')}
          {renderStatsCard('Categories', categories.length.toString(), 'grid-outline', '#3b82f6')}
          {renderStatsCard('Orders', '24', 'receipt-outline', '#f59e0b')}
          {renderStatsCard('Revenue', '$2,450', 'cash-outline', '#10b981')}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        {renderQuickAction(
          'Manage Products',
          'Add, edit, or remove products',
          'cube-outline',
          handleManageProducts
        )}
        
        {renderQuickAction(
          'Manage Orders',
          'View and process orders',
          'receipt-outline',
          handleManageOrders
        )}
        
        {renderQuickAction(
          'Manage Categories',
          'Organize product categories',
          'grid-outline',
          handleManageCategories
        )}
        
        {renderQuickAction(
          'Analytics',
          'View sales and performance data',
          'analytics-outline',
          () => {}
        )}
        
        {renderQuickAction(
          'Settings',
          'Configure store settings',
          'settings-outline',
          () => {}
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsInfo: {
    flex: 1,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

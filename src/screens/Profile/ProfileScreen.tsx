import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../redux/store';
import { logoutUser } from '../../redux/slices/authSlice';
import { User } from '../../types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => dispatch(logoutUser()) },
      ]
    );
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveProfile = () => {
    // In a real app, you would update the user profile in the database
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleOrderHistory = () => {
    // Navigate to order history screen
    Alert.alert('Order History', 'Order history feature coming soon!');
  };

  const handleAddresses = () => {
    // Navigate to addresses screen
    Alert.alert('Addresses', 'Address management feature coming soon!');
  };

  const handlePaymentMethods = () => {
    // Navigate to payment methods screen
    Alert.alert('Payment Methods', 'Payment methods feature coming soon!');
  };

  const handleNotifications = () => {
    // Navigate to notifications settings
    Alert.alert('Notifications', 'Notification settings feature coming soon!');
  };

  const handleHelp = () => {
    // Navigate to help/support
    Alert.alert('Help & Support', 'Help center feature coming soon!');
  };

  const renderProfileHeader = () => (
    <Card style={styles.profileCard}>
      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userRole}>
            {user?.role === 'admin' ? 'Administrator' : 'Customer'}
          </Text>
        </View>
      </View>
      
      {!isEditing && (
        <Button
          title="Edit Profile"
          onPress={handleEditProfile}
          variant="outline"
          size="small"
          style={styles.editButton}
        />
      )}
    </Card>
  );

  const renderMenuItems = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={handleOrderHistory}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="receipt-outline" size={24} color="#2ecc71" />
          <Text style={styles.menuItemText}>Order History</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="location-outline" size={24} color="#2ecc71" />
          <Text style={styles.menuItemText}>Addresses</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="card-outline" size={24} color="#2ecc71" />
          <Text style={styles.menuItemText}>Payment Methods</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="notifications-outline" size={24} color="#2ecc71" />
          <Text style={styles.menuItemText}>Notifications</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="help-circle-outline" size={24} color="#2ecc71" />
          <Text style={styles.menuItemText}>Help & Support</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      {user?.role === 'admin' && (
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Admin' as never)}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="settings-outline" size={24} color="#2ecc71" />
            <Text style={styles.menuItemText}>Admin Dashboard</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderLogoutButton = () => (
    <View style={styles.logoutContainer}>
      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderProfileHeader()}
      {renderMenuItems()}
      {renderLogoutButton()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    margin: 16,
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
  },
  editButton: {
    marginTop: 16,
  },
  menuContainer: {
    margin: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  logoutContainer: {
    margin: 16,
    marginTop: 32,
  },
  logoutButton: {
    borderColor: '#ef4444',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../redux/store';
import { clearCart } from '../../redux/slices/cartSlice';
import { Address } from '../../types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Loader } from '../../components/Loader';

export default function CheckoutScreen() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!shippingAddress.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!shippingAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!shippingAddress.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!shippingAddress.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!shippingAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!shippingAddress.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, you would:
      // 1. Process payment with Stripe
      // 2. Create order in database
      // 3. Send confirmation email
      // 4. Update inventory

      Alert.alert(
        'Order Placed!',
        'Your order has been placed successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearCart());
              navigation.navigate('Home' as never);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderOrderSummary = () => (
    <Card style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      {items.map((item) => (
        <View key={item.id} style={styles.summaryItem}>
          <Text style={styles.summaryItemName}>
            {item.product.name} x{item.quantity}
          </Text>
          <Text style={styles.summaryItemPrice}>
            {formatPrice(item.price * item.quantity)}
          </Text>
        </View>
      ))}

      <View style={styles.summaryDivider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>Free</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tax</Text>
        <Text style={styles.summaryValue}>{formatPrice(total * 0.1)}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatPrice(total * 1.1)}</Text>
      </View>
    </Card>
  );

  const renderShippingForm = () => (
    <Card style={styles.formCard}>
      <Text style={styles.formTitle}>Shipping Address</Text>
      
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={shippingAddress.name}
        onChangeText={(text) => setShippingAddress({ ...shippingAddress, name: text })}
        error={errors.name}
      />

      <Input
        label="Street Address"
        placeholder="Enter your street address"
        value={shippingAddress.street}
        onChangeText={(text) => setShippingAddress({ ...shippingAddress, street: text })}
        error={errors.street}
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Input
            label="City"
            placeholder="City"
            value={shippingAddress.city}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, city: text })}
            error={errors.city}
          />
        </View>
        <View style={styles.halfWidth}>
          <Input
            label="State"
            placeholder="State"
            value={shippingAddress.state}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, state: text })}
            error={errors.state}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Input
            label="ZIP Code"
            placeholder="ZIP code"
            value={shippingAddress.zipCode}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, zipCode: text })}
            error={errors.zipCode}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfWidth}>
          <Input
            label="Phone"
            placeholder="Phone number"
            value={shippingAddress.phone}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, phone: text })}
            error={errors.phone}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </Card>
  );

  const renderPaymentMethod = () => (
    <Card style={styles.formCard}>
      <Text style={styles.formTitle}>Payment Method</Text>
      
      <View style={styles.paymentOption}>
        <Text style={styles.paymentText}>Credit/Debit Card</Text>
        <Text style={styles.paymentNote}>
          Payment will be processed securely with Stripe
        </Text>
      </View>
    </Card>
  );

  if (isProcessing) {
    return <Loader text="Processing your order..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderOrderSummary()}
        {renderShippingForm()}
        {renderPaymentMethod()}
        
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 16,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  formCard: {
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  paymentOption: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  paymentNote: {
    fontSize: 14,
    color: '#6b7280',
  },
  placeOrderButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

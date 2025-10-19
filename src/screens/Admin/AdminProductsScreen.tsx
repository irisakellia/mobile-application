import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../redux/store';
import { Product } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

export default function AdminProductsScreen() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  const handleAddProduct = () => {
    // Navigate to add product screen
    Alert.alert('Add Product', 'Add product feature coming soon!');
  };

  const handleEditProduct = (product: Product) => {
    // Navigate to edit product screen
    Alert.alert('Edit Product', `Edit ${product.name} feature coming soon!`);
  };

  const handleDeleteProduct = (product: Product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // In a real app, you would delete the product from the database
          Alert.alert('Success', 'Product deleted successfully!');
        }},
      ]
    );
  };

  const handleToggleSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('No Selection', 'Please select products to delete.');
      return;
    }

    Alert.alert(
      'Bulk Delete',
      `Are you sure you want to delete ${selectedProducts.length} products?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // In a real app, you would delete the selected products
          setSelectedProducts([]);
          Alert.alert('Success', 'Selected products deleted successfully!');
        }},
      ]
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Card style={styles.productCard}>
      <TouchableOpacity
        style={styles.productContent}
        onPress={() => handleToggleSelection(item.id)}
      >
        <View style={styles.productInfo}>
          <Image
            source={{ uri: item.images[0] || 'https://via.placeholder.com/60x60' }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.productMeta}>
              <Text style={[
                styles.stockStatus,
                { color: item.inStock ? '#2ecc71' : '#ef4444' }
              ]}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
              <Text style={styles.stockCount}>
                {item.stockCount} units
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditProduct(item)}
          >
            <Ionicons name="pencil" size={20} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteProduct(item)}
          >
            <Ionicons name="trash" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Products ({products.length})</Text>
        <Button
          title="Add Product"
          onPress={handleAddProduct}
          size="small"
          style={styles.addButton}
        />
      </View>
      
      {selectedProducts.length > 0 && (
        <View style={styles.bulkActions}>
          <Text style={styles.selectedCount}>
            {selectedProducts.length} selected
          </Text>
          <Button
            title="Delete Selected"
            onPress={handleBulkDelete}
            variant="outline"
            size="small"
            style={styles.bulkDeleteButton}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    paddingHorizontal: 16,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  selectedCount: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
  },
  bulkDeleteButton: {
    borderColor: '#ef4444',
  },
  productCard: {
    marginBottom: 12,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2ecc71',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

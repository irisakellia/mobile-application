import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProductsByCategory, fetchProducts, searchProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Product } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { Loader } from '../../components/Loader';

export default function ProductListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params as { categoryId?: string };
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    loadProducts();
  }, [categoryId]);

  const loadProducts = async () => {
    if (categoryId) {
      await dispatch(fetchProductsByCategory(categoryId));
    } else {
      await dispatch(fetchProducts());
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(searchProducts(query));
    } else {
      loadProducts();
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product }));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onAddToCart={handleAddToCart}
      style={viewMode === 'list' ? styles.listItem : undefined}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        style={styles.searchBar}
      />
      <View style={styles.headerActions}>
        <Text style={styles.resultCount}>
          {products.length} products found
        </Text>
        <TouchableOpacity onPress={toggleViewMode} style={styles.viewToggle}>
          <Ionicons
            name={viewMode === 'grid' ? 'list' : 'grid'}
            size={24}
            color="#2ecc71"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading && products.length === 0) {
    return <Loader text="Loading products..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={viewMode === 'grid' ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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
  searchBar: {
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    fontSize: 16,
    color: '#6b7280',
  },
  viewToggle: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 16,
  },
});

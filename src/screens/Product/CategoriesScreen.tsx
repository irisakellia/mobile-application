import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCategories } from '../../redux/slices/productSlice';
import { Category } from '../../types';
import { Card } from '../../components/Card';
import { Loader } from '../../components/Loader';

export default function CategoriesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { categories, isLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('ProductList' as never, { categoryId: category.id } as never);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <Card style={styles.categoryCard}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/120x120' }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.categoryDescription}>{item.description}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Loader text="Loading categories..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
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
  row: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

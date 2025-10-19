import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Product } from '../types';
import { Card } from './Card';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  style,
}) => {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join('');
  };

  const cardStyle: ViewStyle = {
    width: 180,
    marginRight: 12,
    ...style,
  };

  const imageStyle: ViewStyle = {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  };

  const titleStyle: TextStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  };

  const brandStyle: TextStyle = {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  };

  const priceContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  };

  const priceStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '700',
    color: '#2ecc71',
  };

  const originalPriceStyle: TextStyle = {
    fontSize: 14,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  };

  const ratingStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  };

  const starsStyle: TextStyle = {
    fontSize: 14,
    color: '#fbbf24',
    marginRight: 4,
  };

  const reviewCountStyle: TextStyle = {
    fontSize: 12,
    color: '#6b7280',
  };

  const addToCartButtonStyle: ViewStyle = {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  };

  const addToCartTextStyle: TextStyle = {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  };

  return (
    <Card style={cardStyle}>
      <TouchableOpacity onPress={() => onPress(product)}>
        <Image
          source={{ uri: product.images[0] || 'https://via.placeholder.com/180x180' }}
          style={imageStyle}
          resizeMode="cover"
        />
        <Text style={titleStyle} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={brandStyle}>{product.brand}</Text>
        
        <View style={priceContainerStyle}>
          <Text style={priceStyle}>{formatPrice(product.price)}</Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={originalPriceStyle}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>

        <View style={ratingStyle}>
          <Text style={starsStyle}>{renderStars(product.rating)}</Text>
          <Text style={reviewCountStyle}>({product.reviewCount})</Text>
        </View>

        {onAddToCart && (
          <TouchableOpacity
            style={addToCartButtonStyle}
            onPress={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <Text style={addToCartTextStyle}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Card>
  );
};

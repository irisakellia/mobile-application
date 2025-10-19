import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { Product, Category } from '../types';
import { sampleProducts, sampleCategories } from './sampleData';

class ProductService {
  async getProducts(): Promise<Product[]> {
    try {
      // Try to get from Firebase first
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Product[];
      } else {
        // Return sample data if Firebase is empty
        return sampleProducts;
      }
    } catch (error: any) {
      // Return sample data if Firebase fails
      console.log('Using sample data for products');
      return sampleProducts;
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('featured', '==', true), limit(10));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('category', '==', categoryId));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categoriesRef = collection(db, 'categories');
      const snapshot = await getDocs(categoriesRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];

      // Simple client-side search (in a real app, you'd use Algolia or similar)
      return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      
      const product = snapshot.docs.find(doc => doc.id === id);
      if (product) {
        return {
          id: product.id,
          ...product.data(),
          createdAt: product.data().createdAt?.toDate() || new Date(),
          updatedAt: product.data().updatedAt?.toDate() || new Date(),
        } as Product;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const productService = new ProductService();

# Shopify Mobile App

A complete React Native e-commerce application built with TypeScript, Redux Toolkit, and Firebase. This app provides a modern shopping experience with user authentication, product browsing, shopping cart, checkout, and admin functionality.

## 🚀 Features

### User Features
- **Authentication**: Register, login, and logout with Firebase
- **Home Screen**: Featured products and categories carousel
- **Product Browsing**: Browse products by category with search functionality
- **Product Details**: Detailed product view with image gallery and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Complete order placement with address and payment
- **User Profile**: View and edit profile, order history

### Admin Features
- **Admin Dashboard**: Overview of products, orders, and revenue
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order status
- **Category Management**: Organize product categories

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Nativewind** for Tailwind CSS styling
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **Firebase** for authentication and database
- **React Hook Form** with Yup validation
- **Expo Image Picker** for image uploads

## 📱 Screenshots

The app includes:
- Modern, clean UI design
- Responsive layout for all screen sizes
- Dark/light theme support
- Smooth animations and transitions
- Intuitive navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional)
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update `src/services/firebase.ts` with your config
   - If Firebase is not set up, the app will use sample data

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── ProductCard.tsx
│   ├── Loader.tsx
│   └── SearchBar.tsx
├── screens/            # Screen components
│   ├── Auth/          # Authentication screens
│   ├── Home/          # Home screen
│   ├── Product/       # Product-related screens
│   ├── Cart/          # Shopping cart
│   ├── Checkout/      # Checkout flow
│   ├── Profile/       # User profile
│   └── Admin/         # Admin screens
├── navigation/         # Navigation configuration
├── redux/             # Redux store and slices
├── services/          # API and Firebase services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Copy your config to `src/services/firebase.ts`

### Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your_app_id
```

## 🎨 Styling

The app uses Nativewind (Tailwind CSS for React Native) for styling. The design system includes:

- **Colors**: Primary green (#2ecc71), secondary gray (#f8f9fa)
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Consistent button styles, cards, and form elements
- **Spacing**: Consistent padding and margins throughout

## 📱 Testing

The app includes sample data for testing without Firebase:

- **Sample Products**: 10 products across different categories
- **Sample Categories**: 6 product categories
- **Test User**: You can register any email/password for testing

## 🚀 Deployment

### Expo Build

1. **Configure app.json** with your app details
2. **Build for production**
   ```bash
   expo build:android
   expo build:ios
   ```

### App Store Deployment

1. Follow Expo's deployment guide
2. Configure app store listings
3. Submit for review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🔮 Future Enhancements

- Push notifications
- Offline support
- Advanced search filters
- Wishlist functionality
- Social login
- Payment integration (Stripe)
- Real-time chat support
- Advanced analytics
- Multi-language support

---

Built with ❤️ using React Native and Expo

# ProfileBook - Social Media Frontend

A modern, Instagram/Facebook-like social media application built with Angular 20 and Angular Material.

## Features

### 🔐 Authentication
- **Separate login pages** for users and admins
- **User registration** with validation
- **JWT-based authentication** with guards
- **Role-based access control** (User/Admin)

### 👤 User Features
- **Dashboard/Feed** - View approved posts from all users
- **Create Posts** - Share text and images with the community
- **Profile Management** - Edit username and profile picture
- **Messaging System** - Real-time chat with other users
- **Post Status Tracking** - See if your posts are pending, approved, or rejected

### 🛡️ Admin Features
- **Admin Dashboard** - Comprehensive management interface
- **Post Moderation** - Approve or reject user posts
- **User Management** - View all users and their activity
- **Report Management** - Handle user reports and resolve issues
- **Statistics** - Overview of platform activity

### 🎨 Modern UI/UX
- **Material Design** components and theming
- **Responsive design** for mobile and desktop
- **Dark/Light theme** support
- **Smooth animations** and transitions
- **Instagram/Facebook-like** interface

## Technology Stack

- **Angular 20** - Latest version with standalone components
- **Angular Material** - UI component library
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling
- **RxJS** - Reactive programming
- **HTTP Client** - API communication

## Project Structure

```
src/app/
├── components/          # Reusable components
├── pages/              # Main application pages
│   ├── login/          # Authentication pages
│   ├── dashboard/      # Main feed
│   ├── profile/        # User profile
│   ├── messages/       # Chat system
│   ├── post-create/    # Post creation
│   └── admin-dashboard/ # Admin interface
├── services/           # API and business logic
├── guards/             # Route protection
└── models/             # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Angular CLI 20+

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

## API Integration

The frontend connects to your .NET Core backend API. Make sure to:

1. **Update API URL** in `src/app/services/api.service.ts`
2. **Configure CORS** in your backend
3. **Set up JWT authentication** endpoints

## Key Components

### 🔑 Authentication Service
- Handles login/logout
- Manages JWT tokens
- Provides user state management

### 📡 API Service
- Centralized HTTP client
- Type-safe API calls
- Error handling

### 🛡️ Route Guards
- `AuthGuard` - Protects authenticated routes
- `AdminGuard` - Restricts admin-only areas

### 📱 Responsive Components
- Mobile-first design
- Touch-friendly interfaces
- Adaptive layouts

## Features in Detail

### User Dashboard
- **Post Feed** - Infinite scroll of approved posts
- **Create Post** - Rich text editor with image upload
- **Navigation** - Sidebar with quick access to all features
- **Real-time Updates** - Live notifications and updates

### Messaging System
- **Conversation List** - All your chats in one place
- **Real-time Chat** - Instant messaging
- **Message History** - Persistent chat history
- **User Search** - Find and start conversations

### Profile Management
- **Profile Editing** - Update username and avatar
- **Post History** - View all your posts and their status
- **Activity Timeline** - Track your platform activity
- **Statistics** - Post count and engagement metrics

### Admin Dashboard
- **Post Moderation** - Approve/reject posts with one click
- **User Management** - View all users and their activity
- **Report Handling** - Resolve user reports efficiently
- **Analytics** - Platform statistics and insights

## Styling and Theming

The application uses a modern design system with:

- **Material Design 3** principles
- **Custom color palette** inspired by social media platforms
- **Responsive breakpoints** for all device sizes
- **Smooth animations** and micro-interactions
- **Accessibility** features and ARIA labels

## Development

### Code Structure
- **Standalone Components** - Modern Angular architecture
- **TypeScript** - Full type safety
- **SCSS Modules** - Scoped styling
- **Reactive Forms** - Form validation and handling

### Best Practices
- **Component-based architecture**
- **Service-oriented design**
- **Reactive programming** with RxJS
- **Error handling** and user feedback
- **Performance optimization**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a capstone project for educational purposes.

---

**ProfileBook** - Connect, Share, and Engage! 🚀
# Auth Demo App 🔐

This is an [Expo](https://expo.dev) project that demonstrates **correct authentication persistence and routing** in a React Native app using Expo Router, SecureStore, and React Query.

## Features

✅ **JWT Token Persistence** - Tokens are securely stored using Expo SecureStore  
✅ **Token Hydration** - App waits for token to be loaded before rendering routes  
✅ **No Route Flashing** - Splash screen prevents incorrect screens from flashing on startup  
✅ **Session Management** - React Query caches user session to prevent redundant API calls  
✅ **Dynamic Routing** - Routes change automatically based on authentication state  
✅ **Protected Routes** - Authenticated screens only accessible with valid token

## Tech Stack

- **React Native** with **Expo**
- **Expo Router** - File-based routing with dynamic navigation
- **Expo SecureStore** - Persistent encrypted token storage
- **React Query (@tanstack/react-query)** - Session management and caching
- **TypeScript** - Type safety throughout the app

## App Flow

```
App Launch
   |
   v
[ Splash Screen ]  ← Wait for SecureStore token hydration
   |
   v
Token exists? ---- Yes ---> [Home Screen (Authenticated)]
   |                              |
   No                         [Logout]
   |                              |
   v                              v
[Welcome Screen] --> [Login] --> Store token --> [Home Screen]
```

## Screens

1. **Splash Screen** - Shows while SecureStore reads the token on app startup
2. **Welcome Screen** - Default screen for unauthenticated users
3. **Login Screen** - User enters credentials to receive a JWT token
4. **Home Screen** - Protected screen showing user information with logout button

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npx expo start
   ```

3. Open the app:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on your device

## Usage

### First Time Users

1. Launch the app - you'll see the **Welcome Screen**
2. Tap "Get Started" to go to the **Login Screen**
3. Enter any email and password (this is a demo - authentication is simulated)
4. After login, you'll be redirected to the **Home Screen**

### Returning Users

1. Launch the app - you'll see the **Splash Screen** briefly
2. If you were previously logged in, you'll go directly to the **Home Screen**
3. If not logged in, you'll see the **Welcome Screen**

### Logging Out

1. From the **Home Screen**, tap the "Logout" button
2. The token is cleared from SecureStore
3. You'll be redirected to the **Welcome Screen**

### Testing Persistence

1. Log in to the app
2. Close the app completely (swipe it away from recent apps)
3. Reopen the app
4. ✅ You should go directly to the Home Screen (no flashing of Welcome/Login screens!)

## Project Structure

```
app/
├── (auth)/              # Unauthenticated routes
│   ├── welcome.tsx      # Landing page for unauthenticated users
│   ├── login.tsx        # Login form
│   └── _layout.tsx      # Auth stack layout
├── (tabs)/              # Authenticated routes
│   ├── index.tsx        # Home screen (authenticated)
│   └── _layout.tsx      # Tab layout
└── _layout.tsx          # Root layout with auth logic

contexts/
└── auth-context.tsx     # Authentication state management

hooks/
└── use-session.ts       # React Query hook for session data

lib/
├── token-storage.ts     # SecureStore wrapper for token persistence
└── auth-api.ts          # Simulated authentication API

components/
└── splash-screen.tsx    # Loading screen during hydration
```

## Key Implementation Details

### Token Hydration

The app uses a `isHydrated` state to track when the token has been read from SecureStore:

```typescript
useEffect(() => {
  async function loadToken() {
    const storedToken = await tokenStorage.getToken();
    setToken(storedToken);
    setIsHydrated(true); // ✅ Critical - signals token is loaded
  }
  loadToken();
}, []);
```

### Dynamic Routing

The root layout (`app/_layout.tsx`) handles navigation based on authentication state:

```typescript
useEffect(() => {
  if (!isHydrated) return; // ⏳ Wait for token to be loaded
  
  if (token && !inTabsGroup) {
    router.replace('/(tabs)'); // Authenticated → Home
  } else if (!token && !inAuthGroup) {
    router.replace('/(auth)/welcome'); // Unauthenticated → Welcome
  }
}, [token, isHydrated]);
```

### Session Caching

React Query automatically caches the user session to prevent redundant API calls:

```typescript
const query = useQuery({
  queryKey: ['session', token],
  queryFn: () => getUserSession(token!),
  enabled: !!token,
  staleTime: 5 * 60 * 1000, // Cache for 5 minutes
});
```

## Learn More

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Expo SecureStore documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Query documentation](https://tanstack.com/query/latest)

## Join the Community

Join our community of developers creating universal apps:

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)

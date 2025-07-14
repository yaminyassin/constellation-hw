# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project Requirements

This project is dedicated to complete Constellation techhub assignment:

Problem Statement: Vehicle Results and Filtering

You are tasked with implementing a simple vehicle results page in React Native. You should use Visual Studio Code to develop your solution and commit your code to a publicly accessible repo like GitHub.
Import the dataset of vehicles from the provided Json file. This file contains a randomly generated set of vehicles. Each vehicle should have the following properties:
• Make
• Model
• Engine Size
• Fuel Type
• Year
• Mileage
• Auction Date and Time
• Starting Bid
• Favourite

Your application should store this data in state (of your choosing) and present the results in a friendly format. For each vehicle, please include a placeholder for an image. Feel free to indicate this is a placeholder, or choose your own image to display. Each vehicle should display the number of days and hours until its auction begins. Each vehicle in the results should clearly indicate if a user has selected the vehicle as a “favourite”.

A user can interact with the page in the following ways…

Provide the ability to filter by Make, Model, a Starting Bid range, and/or show only a user’s “favourite” vehicles.

Allow a user to favourite or un-favourite a vehicle.

Allow a user to click a vehicle in the results to display a vehicle details page about the clicked vehicle. Feel free to pad this page out with lorem ipsum to represent more detail.

## Project Layout

- **app/**: Contains route and screen files (e.g., `filters.tsx`, `index.tsx`, `vehicle/[id].tsx`) and layouts.
- **components/**: Reusable UI components (e.g., `FavoriteButton.tsx`, `HorizontalChips.tsx`, `ListItem.tsx`, `StickySearchHeader.tsx`).
- **hooks/**: Custom React hooks (e.g., `useVehicle.tsx`, `useAnimatedHeader.tsx`).
- **helpers/**: Utility functions for data loading and formatting (`helpers.ts`).
- **models/**: TypeScript interfaces and types (e.g., `VehicleWithId`).
- **store/**: Zustand-based state management modules (`vehicles.ts`, `filters.ts`, `favourites.ts`).
- **mocks/**: Mock data files (`vehicles.json`).
- **assets/**: Static assets like fonts and images.
- **Configuration files**: `app.json`, `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `tsconfig.json`.

## Store Implementation

We use Zustand for global state management, combined with the `persist` middleware to automatically save state to AsyncStorage:

- `vehicles.ts`: Defines `useVehiclesStore` for loading, updating, and retrieving vehicles, with error handling and persistence under the key `"vehicles-store"`.
- `filters.ts`: Defines `useFiltersStore` to manage filter state (Make, Model, price range, favourites), with persistence under the key `"filters-store"`.
- `favourites.ts`: Defines `useFavouritesStore` to track user-selected favourite vehicles, persisted under the key `"favourites-store"`.

Each store slice cleanly separates state and actions, enabling a lightweight and modular approach to state management.

## Styling & Animation

### Styling

We use NativeWind, a Tailwind CSS-inspired library for React Native, enabling utility-first styling via the `className` prop, which improves readability, consistency, and developer experience. For cases where `className` isn't supported (e.g., certain shadow styles), we fallback to React Native's `StyleSheet`. We also use `Pressable` for touch interactions to leverage built-in feedback and accessibility. We destructure React imports for better tree-shaking and code clarity, avoid `useMemo`/`useCallback` as React Compiler automatically memoizes for us.

### Animation

Animations are powered by React Native Reanimated, using hooks like `useSharedValue`, `useAnimatedStyle`, and `useAnimatedScrollHandler` (as seen in `useAnimatedHeader`) to run animations on the native UI thread, ensuring smooth, jank-free updates and declarative APIs for complex interactions.

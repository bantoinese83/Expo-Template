# Expo Template 

A comprehensive, strictly-typed Expo template refactored for performance, maintainability, and clean code.

## 🚀 Features

- **Strict TypeScript**: 100% type safety with zero `tsc` errors.
- **Modern ESLint 9**: Flat configuration using `typescript-eslint` and `eslint-plugin-react-native`.
- **Prettier**: Consistent formatting across the entire codebase.
- **SOLID & SoC**: Refactored components and logic for better separation of concerns.
- **DRY Architecture**: Centralized styles and common form field wrappers.
- **Optimized Performance**: Minimized redundant renders and cleaned dead code.

## 🛠 Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [ESLint 9](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📂 Project Structure

- `src/components`: UI components, including a centralized `common/form` directory.
- `src/navigation`: Strongly-typed navigators (Stack and Tab).
- `src/screens`: Organized screen components (Auth, Tabs, Onboarding).
- `src/utils`: Typed utility functions and local storage management.
- `theme/`: Centralized `colors`, `fonts`, and `styles`.

## 📜 Available Scripts

- `npm run start`: Start the Expo development server.
- `npm run lint`: Run ESLint to find and fix code quality issues.
- `npm run format`: Format the codebase using Prettier.
- `npm run check-types`: Perform a full TypeScript type check.

## 🧹 Code Quality

This project adheres to high engineering standards:
- **No Dead Code**: All commented-out and unused code has been removed.
- **No Lint Errors**: Passes a clean ESLint run.
- **Zero Type Errors**: Strict mode enabled with no `any` hacks (where possible).

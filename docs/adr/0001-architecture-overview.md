# ADR 0001: Architecture Overview

## Status

Accepted

## Context

We need a robust, scalable, and developer-friendly stack for building high-quality mobile applications with Expo. The goal is to provide a template that follows modern best practices, ensures type safety, and offers a great developer experience.

## Decision

We have chosen the following core technologies:

1.  **Expo Router**: A file-based router for React Native and web applications. It provides a seamless navigation experience, deep linking out of the box, and a structure similar to Next.js.
2.  **Drizzle ORM**: A lightweight and type-safe ORM for SQL databases. We use it with `expo-sqlite` to provide a robust local database layer with easy migrations and full TypeScript support.
3.  **NativeWind (v4)**: A styling library that allows using Tailwind CSS in React Native. It enables rapid UI development with a utility-first approach while maintaining native performance.
4.  **React Query (TanStack Query)**: A powerful data-fetching and state management library. It handles caching, synchronization, and server state out of the box, significantly reducing the amount of boilerplate code for API interactions.
5.  **Zustand**: For simple, lightweight global client-side state management (e.g., UI preferences, session state).
6.  **Expo UI Swift-UI Extension System**: For premium high-fidelity native layouts (e.g. system-blurred glassmorphic views) compiled natively using SwiftUI for a flawless iOS aesthetic.
7.  **MMKV (v4)**: High-speed, C++ backend native key-value store replacing traditional async storage engines with zero-cost retrieval latency.

## Consequences

- **Type Safety**: The entire stack is built with TypeScript in mind, ensuring end-to-end type safety from the database layer to the UI.
- **Developer Velocity**: Tailwind CSS, file-based routing, and custom native generators allow for faster iteration and an intuitive project structure.
- **Maintainability**: Clear separation of concerns between data fetching (React Query), local storage (Drizzle, MMKV), and UI (NativeWind, Swift-UI Native Modules).
- **Performance**: Optimized for mobile performance with zero-latency storage (MMKV) and system-level rendering materials (SwiftUI Materials).

# Merquri Notes App

A simple Notes application built with React Native (Expo) and TypeScript.

## Features
- **Home Page**: View latest notes by category (Work and Study, Life, Health and Well-being).
- **New Note**: Create notes with category selection (max 200 chars).
- **Summary**: View statistics of notes per category.
- **Settings**: Delete all notes.
- **Persistence**: Notes are saved locally using AsyncStorage.

## Runtime Environment & SDK Versions

- **Runtime**: Node.js (Version used during development: `v20.x` or similar)
- **Framework**: Expo `~54.0.25`
- **React Native**: `0.81.5`
- **React**: `19.1.0`
- **TypeScript**: `~5.9.2`
- **Navigation**: `expo-router` `~6.0.15`
- **Storage**: `@react-native-async-storage/async-storage` `^2.2.0`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run android
   # or
   npm run ios
   ```

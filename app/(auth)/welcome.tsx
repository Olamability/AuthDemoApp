import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Welcome to Auth Demo</ThemedText>
        <ThemedText style={styles.subtitle}>
          This app demonstrates authentication persistence and routing in React Native with Expo Router, SecureStore, and React Query.
        </ThemedText>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>Get Started</ThemedText>
          </TouchableOpacity>
        </Link>

        <View style={styles.featuresList}>
          <ThemedText style={styles.featureTitle}>Features:</ThemedText>
          <ThemedText style={styles.feature}>✓ JWT Token Persistence</ThemedText>
          <ThemedText style={styles.feature}>✓ Secure Storage</ThemedText>
          <ThemedText style={styles.feature}>✓ Session Management</ThemedText>
          <ThemedText style={styles.feature}>✓ Protected Routes</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    gap: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresList: {
    marginTop: 30,
    gap: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    opacity: 0.8,
  },
});

import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useSession } from '@/hooks/use-session';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { isLoading } = useSession();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Welcome!</ThemedText>
        
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <ThemedText style={styles.greeting}>
              Hello, {user?.name || 'User'}!
            </ThemedText>
            
            <View style={styles.infoCard}>
              <ThemedText style={styles.infoLabel}>Email:</ThemedText>
              <ThemedText style={styles.infoValue}>{user?.email || 'N/A'}</ThemedText>
            </View>

            <View style={styles.infoCard}>
              <ThemedText style={styles.infoLabel}>User ID:</ThemedText>
              <ThemedText style={styles.infoValue}>{user?.id || 'N/A'}</ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Authentication Status</ThemedText>
              <ThemedText style={styles.statusText}>✓ Authenticated</ThemedText>
              <ThemedText style={styles.statusText}>✓ Token stored in SecureStore</ThemedText>
              <ThemedText style={styles.statusText}>✓ Session cached with React Query</ThemedText>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    gap: 5,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    opacity: 0.8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useCounterStore } from '../store/useCounterStore';
import { useThemeStore } from '../store/useThemeStore';
import { usePosts, Post } from '../api/hooks/usePosts';

export const DemoScreen = () => {
  const { count, increment, decrement } = useCounterStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';
  const { data: posts, isLoading, isError, refetch } = usePosts();

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={[styles.postTitle, isDarkMode && styles.darkText]}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Core Architecture Demo
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Zustand State Management
        </Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Counter: {count}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.text, isDarkMode && styles.darkText, { marginTop: 10 }]}>
          Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { flex: 1 }]}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          TanStack Query (API)
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <View>
            <Text style={styles.errorText}>Error fetching posts</Text>
            <TouchableOpacity style={styles.button} onPress={() => refetch()}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={posts?.slice(0, 5)}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  section: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  darkText: {
    color: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  postItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 14,
    color: '#555',
  },
  listContent: {
    paddingBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

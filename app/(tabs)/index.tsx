import { CategorySection } from '@/components/CategorySection';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Category, useNotes } from '@/context/NoteContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { notes } = useNotes();
  const router = useRouter();

  const categories: Category[] = ['Work and Study', 'Life', 'Health and Well-being'];

  const getLatestNotes = (category: Category) => {
    return notes
      .filter(note => note.category === category)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
        <TouchableOpacity onPress={() => router.push('/new-note')} style={styles.addButton}>
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categories.map(category => (
          <CategorySection 
            key={category} 
            category={category} 
            notes={getLatestNotes(category)} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200ee',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for tab bar
  },
});

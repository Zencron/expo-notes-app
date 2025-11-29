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
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
          <IconSymbol name="gear" size={24} color="#333" />
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
    backgroundColor: '#F7F7F7', // Premium background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
});

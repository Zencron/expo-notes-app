import { Category, useNotes } from '@/context/NoteContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SummaryScreen() {
  const { notes } = useNotes();

  const categories: Category[] = ['Work and Study', 'Life', 'Health and Well-being'];

  const getCount = (category: Category) => {
    return notes.filter(note => note.category === category).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <View style={styles.statsContainer}>
        {categories.map(category => (
          <View key={category} style={styles.statRow}>
            <Text style={styles.categoryName}>{category}</Text>
            <View style={styles.badge}>
              <Text style={styles.countText}>{getCount(category)}</Text>
            </View>
          </View>
        ))}
        <View style={[styles.statRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total Notes</Text>
          <Text style={styles.totalCount}>{notes.length}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 10,
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryName: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#e8eaf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 10,
    paddingTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

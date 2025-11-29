import { Colors } from '@/constants/Colors';
import { Category, useNotes } from '@/context/NoteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SummaryScreen() {
  const { notes } = useNotes();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const categories: Category[] = ['Work and Study', 'Life', 'Health and Well-being'];

  const getCount = (category: Category) => {
    return notes.filter(note => note.category === category).length;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Summary</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.statsContainer, { backgroundColor: theme.cardBackground }]}>
          {categories.map(category => (
            <View key={category} style={[styles.statRow, { borderBottomColor: theme.border }]}>
              <Text style={[styles.categoryName, { color: theme.text }]}>{category}</Text>
              <View style={[styles.badge, { backgroundColor: theme.tint + '15' }]}>
                <Text style={[styles.countText, { color: theme.tint }]}>{getCount(category)}</Text>
              </View>
            </View>
          ))}
          <View style={[styles.statRow, styles.totalRow]}>
            <Text style={[styles.totalText, { color: theme.text }]}>Total Notes</Text>
            <Text style={[styles.totalCount, { color: theme.tint }]}>{notes.length}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  statsContainer: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 10,
    paddingTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

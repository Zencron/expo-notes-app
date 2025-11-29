import { Colors } from '@/constants/Colors';
import { Category, Note } from '@/context/NoteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NoteCard } from './NoteCard';

interface CategorySectionProps {
  category: Category;
  notes: Note[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, notes }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  if (notes.length === 0) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.text }]}>{category}</Text>
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingLeft: 4,
    letterSpacing: 0.5,
  },
});

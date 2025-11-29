import { Category, Note } from '@/context/NoteContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NoteCard } from './NoteCard';

interface CategorySectionProps {
  category: Category;
  notes: Note[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, notes }) => {
  if (notes.length === 0) {
    return null; // Don't render empty sections if desired, or render a placeholder
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    paddingLeft: 4,
  },
});

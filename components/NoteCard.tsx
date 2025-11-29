import { Note } from '@/context/NoteContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString();
  const truncatedContent = note.content.length > 20 
    ? note.content.substring(0, 20) + '...' 
    : note.content;

  return (
    <View style={styles.card}>
      <Text style={styles.content}>{truncatedContent}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee', // Accent color
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System', // Use system font or custom font if available
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

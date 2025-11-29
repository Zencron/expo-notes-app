import { Colors } from '@/constants/Colors';
import { Note } from '@/context/NoteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const formattedDate = new Date(note.createdAt).toLocaleString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  
  const truncatedContent = note.content.length > 20 
    ? note.content.substring(0, 20) + '...' 
    : note.content;

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.content, { color: theme.text }]}>{truncatedContent}</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{formattedDate}</Text>
      </View>
      <View style={[styles.categoryIndicator, { backgroundColor: theme.tint }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    lineHeight: 22,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
  },
  categoryIndicator: {
    width: 6,
    height: '100%',
  },
});

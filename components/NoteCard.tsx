import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/Colors';
import { Note, useNotes } from '@/context/NoteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  const { deleteNote } = useNotes();

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => deleteNote(note.id) 
        },
      ]
    );
  };

  const router = useRouter();

  const handlePress = () => {
    router.push(`/note/${note.id}` as any);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <TouchableOpacity onPress={handlePress} style={styles.contentContainer}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>{note.title || 'Untitled'}</Text>
        <Text style={[styles.content, { color: theme.textSecondary }]} numberOfLines={2}>{truncatedContent}</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{formattedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <IconSymbol name="trash" size={20} color={theme.textSecondary} />
      </TouchableOpacity>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
  },
  categoryIndicator: {
    width: 6,
    height: '100%',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

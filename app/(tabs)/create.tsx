import { Colors } from '@/constants/Colors';
import { Category, useNotes } from '@/context/NoteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { addNote } = useNotes();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [category, setCategory] = useState<Category>('Work and Study');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const categories: Category[] = ['Work and Study', 'Life', 'Health and Well-being'];

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content.');
      return;
    }
    
    await addNote(category, title, content);
    setTitle(''); // Clear title
    setContent(''); // Clear input
    router.push('/'); // Navigate to Home
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>New Note</Text>
        <TouchableOpacity onPress={handleSave} style={[styles.saveButton, { backgroundColor: theme.tint }]}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  { backgroundColor: theme.cardBackground, borderColor: theme.border },
                  category === cat && { backgroundColor: theme.tint + '15', borderColor: theme.tint }
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  { color: theme.textSecondary },
                  category === cat && { color: theme.tint, fontWeight: '600' }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Title</Text>
          <TextInput
            style={[styles.titleInput, { color: theme.text, backgroundColor: theme.cardBackground }]}
            placeholder="Note Title"
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Content</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground }]}>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              multiline
              maxLength={200}
              placeholder="Write your note here..."
              placeholderTextColor={theme.textSecondary}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
            <Text style={[styles.counter, { color: theme.textSecondary }]}>{content.length}/200</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
  },
  titleInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    borderRadius: 16,
    padding: 20,
    height: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
  },
  counter: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 10,
  },
});

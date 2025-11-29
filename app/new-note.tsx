import { IconSymbol } from '@/components/ui/icon-symbol';
import { Category, useNotes } from '@/context/NoteContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewNoteScreen() {
  const router = useRouter();
  const { addNote } = useNotes();
  const [category, setCategory] = useState<Category>('Work and Study');
  const [content, setContent] = useState('');

  const categories: Category[] = ['Work and Study', 'Life', 'Health and Well-being'];

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content.');
      return;
    }
    
    await addNote(category, content);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>New Note</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipSelected
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Content</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              maxLength={200}
              placeholder="Write your note here..."
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
            <Text style={styles.counter}>{content.length}/200</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    padding: 5,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipSelected: {
    backgroundColor: '#e8eaf6',
    borderColor: '#3f51b5',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextSelected: {
    color: '#3f51b5',
    fontWeight: '600',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fafafa',
    height: 200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  counter: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Category = 'Work and Study' | 'Life' | 'Health and Well-being';

export interface Note {
  id: string;
  category: Category;
  title: string;
  content: string;
  createdAt: number;
}

interface NoteContextType {
  notes: Note[];
  addNote: (category: Category, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  deleteAllNotes: () => Promise<void>;
  refreshNotes: () => Promise<void>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const STORAGE_KEY = '@merquri_notes_app_data';

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setNotes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      const jsonValue = JSON.stringify(newNotes);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      setNotes(newNotes);
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  };

  const addNote = async (category: Category, title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      category,
      title: title || 'Untitled',
      content,
      createdAt: Date.now(),
    };
    const updatedNotes = [newNote, ...notes];
    await saveNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    await saveNotes(updatedNotes);
  };

  const deleteAllNotes = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setNotes([]);
    } catch (e) {
      console.error('Failed to delete notes', e);
    }
  };

  const refreshNotes = async () => {
    await loadNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, deleteAllNotes, refreshNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

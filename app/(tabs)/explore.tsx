import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const GENRES = [
  { id: '1', title: 'Pop', color: '#E13300' },
  { id: '2', title: 'Rock', color: '#7358FF' },
  { id: '3', title: 'Hip-Hop', color: '#AF2896' },
  { id: '4', title: 'R&B', color: '#D84000' },
  { id: '5', title: 'Country', color: '#E1118C' },
  { id: '6', title: 'Jazz', color: '#509BF5' },
  { id: '7', title: 'Karaoke Hits', color: '#1AA1D8' },
  { id: '8', title: 'Top Charts', color: '#8D67AB' },
];

const GenreCard = ({ title, color }: { title: string, color: string }) => (
  <TouchableOpacity style={[styles.genreCard, { backgroundColor: color }]}>
    <ThemedText style={styles.genreTitle} type="defaultSemiBold">{title}</ThemedText>
  </TouchableOpacity>
);

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Search</ThemedText>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#121212" />
            <TextInput 
              placeholder="What do you want to sing?" 
              placeholderTextColor="#535353"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Browse all</ThemedText>
          <View style={styles.genreGrid}>
            {GENRES.map(genre => (
              <GenreCard key={genre.id} title={genre.title} color={genre.color} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
  },
  searchBarContainer: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: 'white',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  genreCard: {
    width: '47.5%',
    height: 100,
    borderRadius: 8,
    padding: 12,
    overflow: 'hidden',
  },
  genreTitle: {
    fontSize: 16,
    color: 'white',
  },
});

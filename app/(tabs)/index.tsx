import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SONGS, Song } from '@/constants/Songs';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

const FilterChip = ({ label, active = false }: { label: string, active?: boolean }) => (
  <TouchableOpacity style={[styles.filterChip, active && styles.filterChipActive]}>
    <ThemedText style={[styles.filterText, active && styles.filterTextActive]}>{label}</ThemedText>
  </TouchableOpacity>
);

const RecentCard = ({ song }: { song: Song }) => (
  <TouchableOpacity 
    style={styles.recentCard}
    onPress={() => router.push({ pathname: '/karaoke-player', params: { songId: song.id } })}
  >
    <Image 
      source={song.cover} 
      style={styles.recentImage} 
      contentFit="cover"
      transition={200}
    />
    <ThemedText style={styles.recentText} numberOfLines={1} type="defaultSemiBold">
      {song.title}
    </ThemedText>
  </TouchableOpacity>
);

const SongCard = ({ song }: { song: Song }) => (
  <TouchableOpacity 
    style={styles.songCard}
    onPress={() => router.push({ pathname: '/karaoke-player', params: { songId: song.id } })}
  >
    <Image 
      source={song.cover} 
      style={styles.songImage} 
      contentFit="cover"
      transition={200}
    />
    <ThemedText style={styles.songTitle} numberOfLines={1} type="defaultSemiBold">
      {song.title}
    </ThemedText>
    <ThemedText style={styles.songArtist} numberOfLines={1}>
      {song.artist}
    </ThemedText>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dynamic Background Mesh (Spotify vibe) */}
        <LinearGradient
          colors={['#1AA1D833', '#000000']}
          style={styles.headerGradient}
        >
          <View style={styles.topNav}>
             <View style={styles.userIcon}>
                <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>J</ThemedText>
             </View>
             <View style={styles.filterRow}>
                <FilterChip label="All" active />
                <FilterChip label="Music" />
                <FilterChip label="Podcasts" />
             </View>
          </View>

          <View style={styles.header}>
            <ThemedText type="title" style={styles.greeting}>Good afternoon</ThemedText>
          </View>

          <View style={styles.recentGrid}>
            {SONGS.slice(0, 6).map((song) => (
              <RecentCard key={song.id} song={song} />
            ))}
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Jump back in</ThemedText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={SONGS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SongCard song={item} />}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Trending Karaoke</ThemedText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={SONGS.slice().reverse()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SongCard song={item} />}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recommended for you</ThemedText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={SONGS.slice(2)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SongCard song={item} />}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerGradient: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC82C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  filterChipActive: {
    backgroundColor: '#FFC82C',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  recentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  recentCard: {
    width: '48.5%',
    height: 56,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  recentImage: {
    width: 56,
    height: 56,
  },
  recentText: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  section: {
    marginTop: 24,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    color: 'white',
  },
  horizontalList: {
    paddingRight: 16,
    gap: 16,
  },
  songCard: {
    width: 160,
  },
  songImage: {
    width: 160,
    height: 160,
    borderRadius: 4, // Spotify uses smaller radii for main covers
    marginBottom: 8,
  },
  songTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    color: 'white',
  },
  songArtist: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    opacity: 0.8,
  },
});

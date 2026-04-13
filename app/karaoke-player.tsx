import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withRepeat,
  interpolate,
  FadeIn,
  ZoomIn,
  Extrapolate
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { SONGS } from '@/constants/Songs';
import { LYRICS_MAP } from '@/constants/Lyrics';
import { ScrollingPitchMeter } from '@/components/scrolling-pitch-meter';
import { SyllableLyricLine } from '@/components/syllable-lyric-line';

const { width, height } = Dimensions.get('window');

export default function KaraokePlayerScreen() {
  const { width, height } = useWindowDimensions();
  const { songId } = useLocalSearchParams();
  const song = SONGS.find(s => s.id === songId) || SONGS[0];
  const lyricLines = LYRICS_MAP[song.id] || LYRICS_MAP['1'];
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const progress = useSharedValue(0);
  const userPitch = useSharedValue(60);
  const lineProgress = useSharedValue(0); 
  
  const meshPos1 = useSharedValue(0);

  useEffect(() => {
    meshPos1.value = withRepeat(withTiming(1, { duration: 10000 }), -1, true);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        progress.value = (progress.value + 0.0008) % 1;
        
        const currentMs = progress.value * 20000;
        
        const lineIndex = lyricLines.findIndex((l, i) => {
          const nextLine = lyricLines[i+1];
          return currentMs >= l.time && (!nextLine || currentMs < nextLine.time);
        });

        if (lineIndex !== -1 && lineIndex !== currentLineIndex) {
          setCurrentLineIndex(lineIndex);
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: lineIndex * 80,
              animated: true
            });
          }
        }

        const currentLine = lyricLines[lineIndex !== -1 ? lineIndex : currentLineIndex];
        if (currentLine) {
          lineProgress.value = currentMs - currentLine.time;

          const pitchArray = currentLine.pitchData || [];
          if (pitchArray.length > 0) {
            const wordIdx = Math.floor((lineProgress.value / 4000) * pitchArray.length);
            const target = pitchArray[Math.min(wordIdx, pitchArray.length - 1)] || 60;
            userPitch.value = withSpring(target + (Math.random() * 4 - 2), { damping: 10 });
          }
        }
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentLineIndex]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          setIsPlaying(true);
        }
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const togglePlay = () => {
    if (!isPlaying && progress.value === 0) {
      setCountdown(3);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, width - 50])
  }));

  const meshStyle1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: Math.sin(meshPos1.value * Math.PI * 2) * 50 },
      { translateY: Math.cos(meshPos1.value * Math.PI * 2) * 30 }
    ]
  }));

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <Image source={song.cover} style={StyleSheet.absoluteFill} contentFit="cover" />
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        <Animated.View style={[
          styles.meshGradient, 
          { width: width * 1.2, height: width * 1.2, top: -width * 0.2, left: -width * 0.1 },
          meshStyle1
        ]}>
            <LinearGradient 
                colors={['#1AA1D8aa', 'transparent']} 
                style={{ flex: 1, borderRadius: width }} 
            />
        </Animated.View>
        <LinearGradient 
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', 'black']} 
            style={StyleSheet.absoluteFill} 
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-down" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.songInfo}>
          <ThemedText style={styles.songTitle}>{song.title}</ThemedText>
          <ThemedText style={styles.songArtist}>{song.artist}</ThemedText>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrolling Pitch Meter */}
      <ScrollingPitchMeter 
        pitchData={lyricLines.flatMap(l => l.pitchData)} 
        progress={progress} 
        userPitch={userPitch} 
      />

      {/* Syllable Lyrics Section */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.lyricsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: height * 0.1, paddingBottom: height * 0.4 }}
      >
        {lyricLines.map((line, index) => {
          const isCurrent = index === currentLineIndex;
          const isPast = index < currentLineIndex;
          return (
            <SyllableLyricLine 
              key={index}
              words={line.words}
              active={isCurrent}
              past={isPast}
              currentTime={lineProgress}
            />
          );
        })}
      </ScrollView>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.progressBarBg}>
           <Animated.View style={[styles.progressBarFill, progressBarStyle]} />
        </View>
        
        <View style={styles.controlButtons}>
          <TouchableOpacity>
            <Ionicons name="shuffle" size={28} color="#FFC82C" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={38} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlay} activeOpacity={0.7} style={styles.playButton}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={38} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={28} color="#FFC82C" />
          </TouchableOpacity>
        </View>

        <View style={styles.footerIcons}>
          <TouchableOpacity style={styles.vocalControlBtn}>
            <Ionicons name="mic-outline" size={24} color="#FFC82C" />
            <ThemedText style={styles.vocalText}>Sing</ThemedText>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity>
            <Ionicons name="list-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Countdown Overlay */}
      {countdown > 0 && (
        <View style={styles.countdownOverlay}>
          <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
          <Animated.View 
            key={countdown}
            entering={ZoomIn.duration(400)} 
            style={styles.countdownContainer}
          >
            <ThemedText style={styles.countdownNumber}>{countdown}</ThemedText>
            <ThemedText style={styles.countdownSub}>Get Ready!</ThemedText>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  meshGradient: {
    position: 'absolute',
    top: -height * 0.2,
    left: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    zIndex: 1,
  },
  gradientCircle: {
    flex: 1,
    borderRadius: width * 0.75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songInfo: {
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -0.5,
  },
  songArtist: {
    fontSize: 13,
    color: 'white',
    opacity: 0.8,
    fontWeight: '500',
  },
  lyricsContainer: {
    flex: 1,
    zIndex: 5,
  },
  controls: {
    paddingHorizontal: 25,
    paddingBottom: 50,
    zIndex: 10,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 25,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFC82C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC82C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vocalControlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 200, 44, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 44, 0.3)',
  },
  vocalText: {
    color: '#FFC82C',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNumber: {
    fontSize: 140,
    fontWeight: '900',
    color: '#FFC82C',
    lineHeight: 160,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 200, 44, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    includeFontPadding: false,
  },
  countdownSub: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: -10,
    opacity: 0.8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  }
});

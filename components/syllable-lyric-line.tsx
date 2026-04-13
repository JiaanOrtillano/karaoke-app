import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  useDerivedValue,
  SharedValue
} from 'react-native-reanimated';
import { ThemedText } from './themed-text';
import { LyricWord } from '@/constants/Lyrics';

interface Props {
  words: LyricWord[];
  active: boolean;
  past: boolean;
  currentTime: SharedValue<number>; // Relative to line start
}

const AnimatedText = Animated.createAnimatedComponent(ThemedText);

export function SyllableLyricLine({ words, active, past, currentTime }: Props) {
  return (
    <View style={styles.container}>
      {words.map((word, index) => {
        return (
          <WordItem 
            key={index}
            word={word}
            lineActive={active}
            linePast={past}
            currentTime={currentTime}
          />
        );
      })}
    </View>
  );
}

function WordItem({ word, lineActive, linePast, currentTime }: { 
  word: LyricWord, 
  lineActive: boolean, 
  linePast: boolean, 
  currentTime: SharedValue<number> 
}) {
  const isHighlighted = useDerivedValue(() => {
    return currentTime.value >= word.time && currentTime.value < word.time + word.duration;
  });

  const isPast = useDerivedValue(() => {
    return currentTime.value >= word.time + word.duration;
  });

  const animatedStyle = useAnimatedStyle(() => {
    let color = 'rgba(255,255,255,0.3)'; // Default
    let scale = 1;

    if (linePast) {
      color = 'rgba(255,255,255,0.15)';
    } else if (lineActive) {
      if (isHighlighted.value) {
        color = 'white';
        scale = withTiming(1.1, { duration: 100 });
      } else if (isPast.value) {
        color = 'rgba(255,255,255,0.8)';
        scale = withTiming(1, { duration: 100 });
      } else {
        color = 'rgba(255,255,255,0.4)';
        scale = withTiming(1, { duration: 100 });
      }
    }

    return {
      color,
      transform: [{ scale }]
    };
  });

  return (
    <AnimatedText style={[styles.word, animatedStyle]}>
      {word.text}{' '}
    </AnimatedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  word: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 38,
  },
});

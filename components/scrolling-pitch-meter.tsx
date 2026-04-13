import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  SharedValue
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');
const METER_HEIGHT = 100;
const BAR_WIDTH = 40;
const BAR_GAP = 12;

interface PitchPoint {
  pitch: number;
  index: number;
}

interface Props {
  pitchData: number[];
  progress: SharedValue<number>; // 0 to 1 for the whole song/segment
  userPitch: SharedValue<number>;
}

export function ScrollingPitchMeter({ pitchData, progress, userPitch }: Props) {
  // The scrolling effect is achieved by translating the container based on progress
  const scrollingStyle = useAnimatedStyle(() => {
    const totalWidth = pitchData.length * (BAR_WIDTH + BAR_GAP);
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [width / 2, -totalWidth + width / 2]
    );

    return {
      transform: [{ translateX }]
    };
  });

  const userPitchStyle = useAnimatedStyle(() => {
    // Map pitch (e.g., 40 to 80) to vertical position (e.g., METER_HEIGHT to 0)
    const translateY = interpolate(
      userPitch.value,
      [40, 80],
      [METER_HEIGHT - 20, 20],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }]
    };
  });

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.blurBackground}>
        <View style={styles.gridContainer}>
             {/* Horizontal guide lines */}
             {[0, 0.25, 0.5, 0.75, 1].map((p) => (
               <View key={p} style={[styles.guideLine, { top: p * METER_HEIGHT }]} />
             ))}
             
             <Animated.View style={[styles.barsContainer, scrollingStyle]}>
               {pitchData.map((pitch, index) => (
                 <View 
                    key={index} 
                    style={[
                        styles.targetBar, 
                        { 
                            height: 6, 
                            width: BAR_WIDTH, 
                            left: index * (BAR_WIDTH + BAR_GAP),
                            top: interpolate(pitch, [40, 80], [METER_HEIGHT - 20, 20], Extrapolate.CLAMP)
                        }
                    ]} 
                 />
               ))}
             </Animated.View>

             {/* User Pitch Indicator (Static in center-left, background scrolls) */}
             <View style={styles.indicatorTrack}>
                <Animated.View style={[styles.userPitchBlob, userPitchStyle]}>
                    <View style={styles.blobOuter}>
                        <View style={styles.blobInner} />
                    </View>
                </Animated.View>
             </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: METER_HEIGHT,
    width: '94%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginVertical: 20,
  },
  blurBackground: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  gridContainer: {
    flex: 1,
    position: 'relative',
  },
  guideLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  barsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  targetBar: {
    position: 'absolute',
    backgroundColor: 'rgba(26, 161, 216, 0.5)', // Curious Blue with 50% opacity
    borderRadius: 3,
  },
  indicatorTrack: {
    position: 'absolute',
    left: width / 2 - 20, 
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(136, 144, 155, 0.2)', // Regent Gray
    zIndex: 10,
  },
  userPitchBlob: {
    position: 'absolute',
    left: -11,
    zIndex: 20,
  },
  blobOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 200, 44, 0.3)', // Sunglow
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFC82C', // Sunglow
    shadowColor: '#FFC82C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

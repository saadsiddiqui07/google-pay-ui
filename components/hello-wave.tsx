import { memo } from 'react';
import Animated from 'react-native-reanimated';

/**
 * Hello wave component.
 * Optimized with memo.
 */
export const HelloWave = memo(function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
});

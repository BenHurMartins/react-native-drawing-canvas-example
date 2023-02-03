import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ColorSelectorProps, StrokeViewProps} from './types';
import {COLORS, STROKE_SIZE, WIDTH} from './utils';

const StrokeView: FC<StrokeViewProps> = ({color, size}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size,
      }}
    />
  );
};

const StrokeSettings: FC<ColorSelectorProps> = ({
  onChangeColor,
  onChangeStroke,
  currentColor,
  strokeWidth,
}) => {
  const [openColor, setOpenColor] = useState(false);
  const [openStroke, setOpenStroke] = useState(false);

  const COLOR_CONTAINER_WIDTH = openColor ? WIDTH - 90 : 60;
  const STROKE_CONTAINER_WIDTH = openStroke ? WIDTH - 90 : 60;

  const colorAnimatedStyles = useAnimatedStyle(() => {
    return {
      left: 10,
      width: withTiming(COLOR_CONTAINER_WIDTH),
    };
  });
  const strokeAnimatedStyles = useAnimatedStyle(() => {
    return {
      right: 10,
      width: withTiming(STROKE_CONTAINER_WIDTH),
    };
  });

  const handleColorSelector = (c: string) => {
    onChangeColor(c);
    setOpenColor(false);
  };
  const handleStrokeSelector = (s: number) => {
    onChangeStroke(s);
    setOpenStroke(false);
  };

  const handleToggleColor = () => {
    setOpenColor(old => !old);
    setOpenStroke(false);
  };
  const handleToggleStrokeSize = () => {
    setOpenStroke(old => !old);
    setOpenColor(false);
  };

  return (
    <>
      <Animated.View style={[styles.container, colorAnimatedStyles]}>
        <>
          {!openColor && (
            <TouchableOpacity
              onPress={handleToggleColor}
              style={[
                {
                  backgroundColor: currentColor,
                },
                styles.colorButton,
              ]}
            />
          )}
          {openColor &&
            COLORS.map(c => {
              return (
                <TouchableOpacity
                  onPress={() => handleColorSelector(c)}
                  style={[{backgroundColor: c}, styles.colorButton]}
                />
              );
            })}
        </>
      </Animated.View>
      <Animated.View style={[styles.container, strokeAnimatedStyles]}>
        <>
          {!openStroke && (
            <TouchableOpacity
              onPress={handleToggleStrokeSize}
              style={[styles.colorButton]}>
              <StrokeView color={currentColor} size={strokeWidth} />
            </TouchableOpacity>
          )}
          {openStroke &&
            STROKE_SIZE.map(s => {
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => handleStrokeSelector(s)}
                  style={[styles.colorButton]}>
                  <StrokeView color={currentColor} size={s} />
                </TouchableOpacity>
              );
            })}
        </>
      </Animated.View>
    </>
  );
};

export default StrokeSettings;

const styles = StyleSheet.create({
  container: {
    height: 60,
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    justifyContent: 'space-around',
    borderRadius: 10,
    alignItems: 'center',
  },
  colorButton: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

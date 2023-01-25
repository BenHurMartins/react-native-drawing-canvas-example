/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
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
}) => {
  const [openColor, setOpenColor] = useState(false);
  const [openStroke, setOpenStroke] = useState(false);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [currentStrokeSize, setCurrentStrokeSize] = useState(STROKE_SIZE[0]);
  const COLOR_CONTAINER_WIDTH = openColor ? WIDTH - 90 : 60;
  const STROKE_CONTAINER_WIDTH = openStroke ? WIDTH - 90 : 60;
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(COLOR_CONTAINER_WIDTH),
    };
  });
  const strokeAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(STROKE_CONTAINER_WIDTH),
    };
  });

  useEffect(() => {
    onChangeColor(currentColor);
    openColor && setOpenColor(false);
  }, [currentColor]);
  useEffect(() => {
    onChangeStroke(currentStrokeSize);
    openStroke && setOpenStroke(false);
  }, [currentStrokeSize]);

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
      <Animated.View style={[styles.colorContainer, animatedStyles]}>
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
                  onPress={() => setCurrentColor(c)}
                  style={[{backgroundColor: c}, styles.colorButton]}
                />
              );
            })}
        </>
      </Animated.View>
      <Animated.View style={[styles.strokerContainer, strokeAnimatedStyles]}>
        <>
          {!openStroke && (
            <TouchableOpacity
              onPress={handleToggleStrokeSize}
              style={[styles.colorButton]}>
              <StrokeView color={currentColor} size={currentStrokeSize} />
            </TouchableOpacity>
          )}
          {openStroke &&
            STROKE_SIZE.map(size => {
              return (
                <TouchableOpacity
                  key={size}
                  onPress={() => setCurrentStrokeSize(size)}
                  style={[styles.colorButton]}>
                  <StrokeView color={currentColor} size={size} />
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
  colorContainer: {
    height: 60,
    position: 'absolute',
    bottom: 60,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    justifyContent: 'space-around',
    borderRadius: 10,
    alignItems: 'center',
  },
  strokerContainer: {
    height: 60,
    position: 'absolute',
    bottom: 60,
    right: 10,
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

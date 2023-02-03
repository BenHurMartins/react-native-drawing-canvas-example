import React, {useState} from 'react';
import {ColorValue, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ResetFieldIcon from './ResetFieldIcon';
import StrokeSettings from './StrokeSettings';
import {SigningPathType} from './types';
import {COLORS, STROKE_SIZE} from './utils';

const Canvas = () => {
  const [paths, setPaths] = useState<SigningPathType>([]);
  const [color, setColor] = useState(COLORS[0]);
  const [stroke, setStroke] = useState(STROKE_SIZE[0]);

  const setNewPath = (x: number, y: number) => {
    setPaths(prev => {
      const result = [...prev, {path: [`M${x} ${y}`], color, stroke}];
      return result;
    });
  };
  const updatePath = (x: number, y: number) => {
    setPaths(prev => {
      const currentPath = paths[paths.length - 1];
      currentPath && currentPath.path.push(`L${x} ${y}`);

      return currentPath ? [...prev.slice(0, -1), currentPath] : prev;
    });
  };

  return (
    <>
      <View
        style={[styles.canvas]}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderStart={e => {
          setNewPath(e?.nativeEvent?.locationX, e?.nativeEvent?.locationY);
        }}
        onResponderMove={e => {
          updatePath(e?.nativeEvent?.locationX, e?.nativeEvent?.locationY);
        }}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setPaths([])}>
          <ResetFieldIcon />
        </TouchableOpacity>
        <Svg>
          {paths.map(({path, color: c, stroke: s}, i) => {
            return (
              <Path
                key={i}
                d={`${path.join(' ')}`}
                fill="none"
                strokeWidth={`${s}px`}
                stroke={c as ColorValue}
              />
            );
          })}
        </Svg>
      </View>
      <StrokeSettings
        strokeWidth={stroke}
        currentColor={color}
        onChangeColor={setColor}
        onChangeStroke={setStroke}
      />
    </>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: '100%',
  },
  resetButton: {
    position: 'absolute',
    top: 25,
    right: 25,
    zIndex: 2,
  },
});

export default Canvas;

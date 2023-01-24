import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
const WIDTH = Dimensions.get('screen').width;

type PathType = {
  path: String[];
};
export type SigningPathType = PathType[];

const ResetFieldIcon = () => {
  return (
    <Svg height={15} width={15}>
      <Path
        d={
          'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
        }
      />
    </Svg>
  );
};
const App = () => {
  const [paths, setPaths] = useState<SigningPathType>([]);

  const setNewPath = (x: number, y: number) => {
    setPaths(prev => {
      const result = [...prev, {path: [`M${x} ${y}`]}];
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
    <SafeAreaView style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default App;

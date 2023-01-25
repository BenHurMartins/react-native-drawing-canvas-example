import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Canvas from './src/components/Canvas';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Canvas />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

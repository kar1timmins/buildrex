import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import FloorPlanViewer, { type FloorPlanRoom } from './components/projects/FloorPlanViewer';

const rooms: FloorPlanRoom[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    area: '21.4 sqm',
    pathData: 'M 120 140 L 520 140 L 520 460 L 120 460 Z',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    area: '12.1 sqm',
    pathData: 'M 560 140 L 900 140 L 900 360 L 560 360 Z',
  },
  {
    id: 'bedroom-1',
    name: 'Bedroom 1',
    area: '14.8 sqm',
    pathData: 'M 560 400 L 900 400 L 900 700 L 560 700 Z',
  },
];

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screenPadding}>
        <FloorPlanViewer
          floorName="T-104 Ground Floor"
          blueprintSource={require('./assets/floorplans/t104-ground.png')}
          rooms={rooms}
          viewBox="0 0 1200 900"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#091321',
  },
  screenPadding: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});

export default App;
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';

import Home from './src/screens/home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
      style="light"  
      // barStyle="light-content"
      translucent/>
      <ToastManager
        width={380}
        height={70}
        position="top"
        textStyle={{ flex: 1, fontSize: 16}}
        animationStyle="zoomInOut"
      />
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

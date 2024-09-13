import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';

export default function App() {
  const text = 'Hello, my container is blurring contents underneath!';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {[...Array(20).keys()].map(i => (
          <View
            key={`box-${i}`}
            style={[styles.box, i % 2 === 1 ? styles.boxOdd : styles.boxEven]}
          />
        ))}
      </View>
      <BlurView intensity={100} style={styles.blurContainer}>
        <Text style={styles.text}>{text}</Text>
      </BlurView>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <Text style={styles.text}>{text}</Text>
      </BlurView>
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: '#fff' }]}>{text}</Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
  box: {
    width: '25%',
    height: '20%',
  },
  boxEven: {
    backgroundColor: 'orangered',
  },
  boxOdd: {
    backgroundColor: 'gold',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});

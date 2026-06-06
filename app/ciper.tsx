import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CiperScreen() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/ciper-fal.png')}
        style={styles.ciper}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Aprenda a se proteger no mundo digital
        de um jeito divertido!
      </Text>


      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/cadastro')}
        >
        <Text style={styles.buttonText}>
            COMEÇAR MISSÃO
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/login')}
        >
        <Text style={styles.secondaryText}>
            JÁ SOU GUARDIÃO
        </Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  ciper: {
    width: 340,
    height: 340,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#243B53',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#52606D',
    marginBottom: 35,
  },

  primaryButton: {
    backgroundColor: '#2E5BFF',
    width: '100%',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2E5BFF',
    width: '100%',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  secondaryText: {
    color: '#2E5BFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
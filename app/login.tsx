import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from './services/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Digite o email e a senha.');
      return;
    }

    try {
      setCarregando(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      router.replace('/dashboard');
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro no login',
        'Email ou senha incorretos.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/cyber.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Faça login na sua conta</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={() => router.push('/forgot-password')}>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Entrando...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta?</Text>

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.signup}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    width: 250,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#243B53',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    fontSize: 16,
  },

  forgot: {
    textAlign: 'right',
    color: '#2E5BFF',
    marginBottom: 25,
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#2E5BFF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  footerText: {
    color: '#52606D',
  },

  signup: {
    color: '#2E5BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
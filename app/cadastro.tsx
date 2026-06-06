import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from './services/firebase';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function cadastrar() {
    setMensagem('Clicou no botão...');

    if (!email || !senha || !confirmarSenha) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setMensagem('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setCarregando(true);
      setMensagem('Criando conta...');

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        email: email.trim(),
        xp: 125,
        nivel: 'Aprendiz em Cibersegurança',
        missao1Concluida: false,
        criadoEm: new Date(),
      });

      setMensagem('Conta criada com sucesso!');
      router.replace('/dashboard');
    } catch (error: any) {
      console.log('ERRO FIREBASE:', error);

      if (error.code === 'auth/email-already-in-use') {
        setMensagem('Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/invalid-email') {
        setMensagem('E-mail inválido.');
      } else if (error.code === 'auth/weak-password') {
        setMensagem('A senha é muito fraca.');
      } else {
        setMensagem(`Erro: ${error.code || error.message}`);
      }
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

      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="Confirm password"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Criando...' : 'Próximo'}
        </Text>
      </TouchableOpacity>

      {!!mensagem && (
        <Text style={styles.mensagem}>
          {mensagem}
        </Text>
      )}

      <Text style={styles.terms}>
        Ao criar uma conta, você concorda com nossos termos e condições.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já possui uma conta?</Text>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    padding: 30,
    justifyContent: 'center',
  },

  logo: {
    width: 240,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 25,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D9E2EC',
  },

  button: {
    backgroundColor: '#2E5BFF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  mensagem: {
    textAlign: 'center',
    marginTop: 15,
    color: '#EF4444',
    fontWeight: 'bold',
  },

  terms: {
    textAlign: 'center',
    color: '#7B8794',
    marginTop: 20,
    fontSize: 13,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    color: '#52606D',
  },

  login: {
    color: '#2E5BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
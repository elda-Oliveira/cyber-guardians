// app/fundamentos4.tsx

import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Sidebar from '../components/Sidebar';
import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

export default function Fundamentos4Screen() {
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        setTema(dados.tema || 'claro');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: dark ? '#020617' : '#EEF4FF' },
      ]}
    >
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>FUNDAMENTOS • MISSÃO 4</Text>

        <Text
          style={[
            styles.title,
            { color: dark ? '#FFFFFF' : '#243B53' },
          ]}
        >
          Links Suspeitos
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: dark ? '#CBD5E1' : '#52606D' },
          ]}
        >
          Aprenda a identificar links falsos usados em golpes e ataques de phishing.
        </Text>

        <InfoCard
          numero="1"
          titulo="Cuidado com golpes"
          texto="Links falsos podem roubar senhas, dados bancários e informações pessoais."
          dark={dark}
        />

        <InfoCard
          numero="2"
          titulo="Verifique o endereço"
          texto="Antes de clicar, observe se o site está escrito corretamente e se parece confiável."
          dark={dark}
        />

        <InfoCard
          numero="3"
          titulo="Desconfie da urgência"
          texto="Mensagens dizendo 'clique agora' ou 'sua conta será bloqueada' podem ser golpe."
          dark={dark}
        />

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>

          <Text style={styles.quizText}>
            Responda perguntas simples para aprender a reconhecer links perigosos.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/quiz-fundamentos4')}
          >
            <Text style={styles.buttonText}>Iniciar Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoCard({
  numero,
  titulo,
  texto,
  dark,
}: {
  numero: string;
  titulo: string;
  texto: string;
  dark: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
      ]}
    >
      <Text style={styles.cardNumber}>{numero}</Text>

      <View style={styles.cardContent}>
        <Text
          style={[
            styles.cardTitle,
            { color: dark ? '#FFFFFF' : '#243B53' },
          ]}
        >
          {titulo}
        </Text>

        <Text
          style={[
            styles.cardText,
            { color: dark ? '#CBD5E1' : '#52606D' },
          ]}
        >
          {texto}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  badge: {
    marginTop: 40,
    alignSelf: 'flex-start',
    backgroundColor: '#2E5BFF',
    color: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 31,
    fontWeight: 'bold',
    marginTop: 16,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 24,
  },

  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
  },

  cardNumber: {
    backgroundColor: '#2E5BFF',
    color: '#FFF',
    width: 38,
    height: 38,
    borderRadius: 19,
    textAlign: 'center',
    lineHeight: 38,
    fontWeight: 'bold',
    marginRight: 14,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  cardText: {
    lineHeight: 21,
  },

  quizBox: {
    backgroundColor: '#2E5BFF',
    borderRadius: 22,
    padding: 22,
    marginTop: 10,
    marginBottom: 30,
  },

  quizTitle: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: 'bold',
  },

  quizText: {
    color: '#E0EAFF',
    marginTop: 8,
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#2E5BFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Sidebar from '../components/Sidebar';
import { auth, db } from './services/firebase';

const titulos = [
  'Aprendiz em Cibersegurança',
  'Usuário Consciente',
  'Guardião Digital',
  'Investigador Cyber',
  'Defensor da Rede',
  'Especialista em Segurança',
];

type Tema = 'claro' | 'escuro';

export default function PerfilScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [tituloNivel, setTituloNivel] = useState(titulos[0]);
  const [xpProximoNivel, setXpProximoNivel] = useState(750);
  const [progressoNivel, setProgressoNivel] = useState('0%');
  const [carregando, setCarregando] = useState(true);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';
  const colors = getColors(dark);

  function calcularNivel(xpTotal: number) {
    const nivelAtual = Math.floor(xpTotal / 750);
    const xpNoNivel = xpTotal % 750;
    const progresso = Math.round((xpNoNivel / 750) * 100);

    setNivel(nivelAtual + 1);
    setTituloNivel(titulos[nivelAtual] || 'Especialista em Segurança');
    setXpProximoNivel(xpNoNivel === 0 && xpTotal > 0 ? 750 : 750 - xpNoNivel);
    setProgressoNivel(`${progresso}%`);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      setEmail(user.email || '');

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        const xpAtual = dados.xp || 0;

        setNome(dados.nome || user.email?.split('@')[0] || 'Guardião');
        setXp(xpAtual);
        setTema(dados.tema || 'claro');

        calcularNivel(xpAtual);
      } else {
        setNome(user.email?.split('@')[0] || 'Guardião');
      }

      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  if (carregando) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.bg }]}>
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={[styles.title, { color: colors.title }]}>
          Meu Perfil
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={styles.avatar}>👤</Text>

          <Text style={[styles.name, { color: colors.title }]}>
            {nome || 'Guardião'}
          </Text>

          <Text style={[styles.email, { color: colors.text }]}>
            {email}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            Nível atual
          </Text>

          <Text style={styles.value}>{tituloNivel}</Text>

          <Text style={[styles.smallText, { color: colors.text }]}>
            Nível {nivel}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            Total de XP
          </Text>

          <Text style={styles.value}>{xp} XP</Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            Próximo nível
          </Text>

          <Text style={styles.value}>
            Faltam {xpProximoNivel} XP
          </Text>

          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.bar },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                { width: progressoNivel },
              ]}
            />
          </View>

          <Text style={[styles.progressText, { color: colors.text }]}>
            {progressoNivel}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function getColors(dark: boolean) {
  return {
    bg: dark ? '#0F172A' : '#EEF4FF',
    card: dark ? '#1E293B' : '#FFFFFF',
    title: dark ? '#F8FAFC' : '#243B53',
    text: dark ? '#CBD5E1' : '#52606D',
    bar: dark ? '#334155' : '#E2E8F0',
  };
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

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    fontSize: 55,
    marginBottom: 10,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  email: {
    marginTop: 5,
  },

  infoCard: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  label: {},

  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5BFF',
    marginTop: 5,
  },

  smallText: {
    marginTop: 4,
    fontWeight: 'bold',
  },

  progressBar: {
    height: 10,
    borderRadius: 20,
    marginTop: 14,
  },

  progressFill: {
    height: 10,
    backgroundColor: '#2E5BFF',
    borderRadius: 20,
  },

  progressText: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});
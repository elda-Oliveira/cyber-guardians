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

export default function FundamentosTrilhaScreen() {
  const [carregando, setCarregando] = useState(true);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';

  const [missoesConcluidas, setMissoesConcluidas] = useState({
    fundamentos1Concluida: false,
    fundamentos2Concluida: false,
    fundamentos3Concluida: false,
    fundamentos4Concluida: false,
    fundamentos5Concluida: false,
  });

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

        setMissoesConcluidas({
          fundamentos1Concluida: dados.fundamentos1Concluida || false,
          fundamentos2Concluida: dados.fundamentos2Concluida || false,
          fundamentos3Concluida: dados.fundamentos3Concluida || false,
          fundamentos4Concluida: dados.fundamentos4Concluida || false,
          fundamentos5Concluida: dados.fundamentos5Concluida || false,
        });
      }

      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  const missoes = [
    {
      titulo: 'O que é Cibersegurança?',
      icon: '🔐',
      rota: '/fundamentos1',
      cor: '#2563EB',
      progresso: missoesConcluidas.fundamentos1Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Senhas Seguras',
      icon: '🔑',
      rota: '/fundamentos2',
      cor: '#3B82F6',
      progresso: missoesConcluidas.fundamentos2Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Autenticação em 2 Etapas',
      icon: '🛡️',
      rota: '/fundamentos3',
      cor: '#2563EB',
      progresso: missoesConcluidas.fundamentos3Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Links Suspeitos',
      icon: '⚠️',
      rota: '/fundamentos4',
      cor: '#1D4ED8',
      progresso: missoesConcluidas.fundamentos4Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Privacidade Online',
      icon: '👤',
      rota: '/fundamentos5',
      cor: '#1E40AF',
      progresso: missoesConcluidas.fundamentos5Concluida ? '100%' : '0%',
    },
  ];

  if (carregando) {
    return (
      <View
        style={[
          styles.loading,
          { backgroundColor: dark ? '#020617' : '#EEF4FF' },
        ]}
      >
        <Text
          style={[
            styles.loadingText,
            { color: dark ? '#93C5FD' : '#2563EB' },
          ]}
        >
          Carregando trilha...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: dark ? '#020617' : '#EEF4FF' },
      ]}
    >
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text
          style={[
            styles.title,
            { color: dark ? '#FFFFFF' : '#243B53' },
          ]}
        >
          Fundamentos de Cibersegurança
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: dark ? '#CBD5E1' : '#52606D' },
          ]}
        >
          Aprenda os conceitos básicos da segurança digital.
        </Text>

        {missoes.map((missao) => (
          <TouchableOpacity
            key={missao.titulo}
            style={[
              styles.card,
              { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
            ]}
            onPress={() => router.push(missao.rota as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: missao.cor }]}>
              <Text style={styles.icon}>{missao.icon}</Text>
            </View>

            <View style={styles.content}>
              <Text
                style={[
                  styles.cardTitle,
                  { color: dark ? '#FFFFFF' : '#243B53' },
                ]}
              >
                {missao.titulo}
              </Text>

              <View
                style={[
                  styles.bar,
                  { backgroundColor: dark ? '#1E293B' : '#E2E8F0' },
                ]}
              >
                <View style={[styles.fill, { width: missao.progresso }]} />
              </View>
            </View>

            <Text style={styles.progress}>{missao.progresso}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
  },

  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  bar: {
    height: 8,
    borderRadius: 20,
  },

  fill: {
    height: 8,
    backgroundColor: '#2563EB',
    borderRadius: 20,
  },

  progress: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});
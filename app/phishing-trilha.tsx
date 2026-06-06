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

export default function PhishingTrilhaScreen() {
  const [carregando, setCarregando] = useState(true);

  const [missoesConcluidas, setMissoesConcluidas] = useState({
    phishing1Concluida: false,
    phishing2Concluida: false,
    phishing3Concluida: false,
    phishing4Concluida: false,
    phishing5Concluida: false,
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

        setMissoesConcluidas({
          phishing1Concluida: dados.phishing1Concluida || false,
          phishing2Concluida: dados.phishing2Concluida || false,
          phishing3Concluida: dados.phishing3Concluida || false,
          phishing4Concluida: dados.phishing4Concluida || false,
          phishing5Concluida: dados.phishing5Concluida || false,
        });
      }

      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  const missoes = [
    {
      titulo: 'Phishing Genérico',
      icon: '🎣',
      rota: '/phishing1',
      cor: '#22C55E',
      progresso: missoesConcluidas.phishing1Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Spear Phishing',
      icon: '🎯',
      rota: '/phishing2',
      cor: '#F59E0B',
      progresso: missoesConcluidas.phishing2Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Whaling',
      icon: '🐳',
      rota: '/phishing3',
      cor: '#EF4444',
      progresso: missoesConcluidas.phishing3Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Vishing',
      icon: '📞',
      rota: '/phishing4',
      cor: '#8B5CF6',
      progresso: missoesConcluidas.phishing4Concluida ? '100%' : '0%',
    },
    {
      titulo: 'Clone Phishing',
      icon: '🧬',
      rota: '/phishing5',
      cor: '#64748B',
      progresso: missoesConcluidas.phishing5Concluida ? '100%' : '0%',
    },
  ];

  if (carregando) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Carregando trilha...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Trilha de Phishing</Text>

        <Text style={styles.subtitle}>
          Aprenda a identificar golpes digitais e ataques de engenharia social.
        </Text>

        {missoes.map((missao) => (
          <TouchableOpacity
            key={missao.titulo}
            style={styles.card}
            onPress={() => router.push(missao.rota as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: missao.cor }]}>
              <Text style={styles.icon}>{missao.icon}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.cardTitle}>{missao.titulo}</Text>

              <View style={styles.bar}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: missao.progresso,
                      backgroundColor: missao.cor,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={[styles.progress, { color: missao.cor }]}>
              {missao.progresso}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, flexDirection: 'row', backgroundColor: '#EEF4FF' },
  container: { flex: 1, padding: 20 },
  loading: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { fontSize: 18, fontWeight: 'bold', color: '#22C55E' },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#243B53',
    marginTop: 40,
  },
  subtitle: {
    color: '#52606D',
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFF',
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
  icon: { fontSize: 24 },
  content: { flex: 1 },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 10,
  },
  bar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
  },
  fill: {
    height: 8,
    borderRadius: 20,
  },
  progress: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
});
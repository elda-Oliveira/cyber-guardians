import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Sidebar from '../components/Sidebar';
import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

export default function MissoesScreen() {
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState('');
  const [tema, setTema] = useState<Tema>('claro');

  const [fundamentos1Concluida, setFundamentos1Concluida] = useState(false);
  const [fundamentos2Concluida, setFundamentos2Concluida] = useState(false);
  const [fundamentos3Concluida, setFundamentos3Concluida] = useState(false);
  const [fundamentos4Concluida, setFundamentos4Concluida] = useState(false);
  const [fundamentos5Concluida, setFundamentos5Concluida] = useState(false);

  const [phishing1Concluida, setPhishing1Concluida] = useState(false);
  const [phishing2Concluida, setPhishing2Concluida] = useState(false);
  const [phishing3Concluida, setPhishing3Concluida] = useState(false);
  const [phishing4Concluida, setPhishing4Concluida] = useState(false);
  const [phishing5Concluida, setPhishing5Concluida] = useState(false);

  const [criptografia1Concluida, setCriptografia1Concluida] = useState(false);
  const [criptografia2Concluida, setCriptografia2Concluida] = useState(false);
  const [criptografia3Concluida, setCriptografia3Concluida] = useState(false);
  const [criptografia4Concluida, setCriptografia4Concluida] = useState(false);
  const [criptografia5Concluida, setCriptografia5Concluida] = useState(false);

  const [web1Concluida, setWeb1Concluida] = useState(false);
  const [web2Concluida, setWeb2Concluida] = useState(false);
  const [web3Concluida, setWeb3Concluida] = useState(false);
  const [web4Concluida, setWeb4Concluida] = useState(false);
  const [web5Concluida, setWeb5Concluida] = useState(false);

  const [rede1Concluida, setRede1Concluida] = useState(false);
  const [rede2Concluida, setRede2Concluida] = useState(false);
  const [rede3Concluida, setRede3Concluida] = useState(false);
  const [rede4Concluida, setRede4Concluida] = useState(false);
  const [rede5Concluida, setRede5Concluida] = useState(false);

  const dark = tema === 'escuro';
  const colors = getColors(dark);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);

      const unsubscribeUser = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          const dados = snap.data();

          setNome(dados.nome || user.email?.split('@')[0] || 'Guardião');
          setTema(dados.tema || 'claro');

          setFundamentos1Concluida(dados.fundamentos1Concluida || false);
          setFundamentos2Concluida(dados.fundamentos2Concluida || false);
          setFundamentos3Concluida(dados.fundamentos3Concluida || false);
          setFundamentos4Concluida(dados.fundamentos4Concluida || false);
          setFundamentos5Concluida(dados.fundamentos5Concluida || false);

          setPhishing1Concluida(dados.phishing1Concluida || false);
          setPhishing2Concluida(dados.phishing2Concluida || false);
          setPhishing3Concluida(dados.phishing3Concluida || false);
          setPhishing4Concluida(dados.phishing4Concluida || false);
          setPhishing5Concluida(dados.phishing5Concluida || false);

          setCriptografia1Concluida(dados.criptografia1Concluida || false);
          setCriptografia2Concluida(dados.criptografia2Concluida || false);
          setCriptografia3Concluida(dados.criptografia3Concluida || false);
          setCriptografia4Concluida(dados.criptografia4Concluida || false);
          setCriptografia5Concluida(dados.criptografia5Concluida || false);

          setWeb1Concluida(dados.web1Concluida || false);
          setWeb2Concluida(dados.web2Concluida || false);
          setWeb3Concluida(dados.web3Concluida || false);
          setWeb4Concluida(dados.web4Concluida || false);
          setWeb5Concluida(dados.web5Concluida || false);

          setRede1Concluida(dados.rede1Concluida || false);
          setRede2Concluida(dados.rede2Concluida || false);
          setRede3Concluida(dados.rede3Concluida || false);
          setRede4Concluida(dados.rede4Concluida || false);
          setRede5Concluida(dados.rede5Concluida || false);
        }

        setCarregando(false);
      });

      return unsubscribeUser;
    });

    return unsubscribeAuth;
  }, []);

  const fundamentosConcluidas = [
    fundamentos1Concluida,
    fundamentos2Concluida,
    fundamentos3Concluida,
    fundamentos4Concluida,
    fundamentos5Concluida,
  ].filter(Boolean).length;

  const phishingConcluidas = [
    phishing1Concluida,
    phishing2Concluida,
    phishing3Concluida,
    phishing4Concluida,
    phishing5Concluida,
  ].filter(Boolean).length;

  const criptografiaConcluidas = [
    criptografia1Concluida,
    criptografia2Concluida,
    criptografia3Concluida,
    criptografia4Concluida,
    criptografia5Concluida,
  ].filter(Boolean).length;

  const webConcluidas = [
    web1Concluida,
    web2Concluida,
    web3Concluida,
    web4Concluida,
    web5Concluida,
  ].filter(Boolean).length;

  const redeConcluidas = [
    rede1Concluida,
    rede2Concluida,
    rede3Concluida,
    rede4Concluida,
    rede5Concluida,
  ].filter(Boolean).length;

  const progressoFundamentos = `${Math.round((fundamentosConcluidas / 5) * 100)}%`;
  const progressoPhishing = `${Math.round((phishingConcluidas / 5) * 100)}%`;
  const progressoCriptografia = `${Math.round((criptografiaConcluidas / 5) * 100)}%`;
  const progressoWeb = `${Math.round((webConcluidas / 5) * 100)}%`;
  const progressoRede = `${Math.round((redeConcluidas / 5) * 100)}%`;

  const trilhas = [
    {
      titulo: 'Fundamentos de Cibersegurança',
      icon: '🔐',
      rota: '/fundamentos-trilha',
      concluida: fundamentosConcluidas === 5,
      progress: progressoFundamentos,
      color: '#2563EB',
    },
    {
      titulo: 'Phishing',
      icon: '🎣',
      rota: '/phishing-trilha',
      concluida: phishingConcluidas === 5,
      progress: progressoPhishing,
      color: '#22C55E',
    },
    {
      titulo: 'Criptografia',
      icon: '🔒',
      rota: '/criptografia-trilha',
      concluida: criptografiaConcluidas === 5,
      progress: progressoCriptografia,
      color: '#6366F1',
    },
    {
      titulo: 'Aplicações Web',
      icon: '🌐',
      rota: '/web-trilha',
      concluida: webConcluidas === 5,
      progress: progressoWeb,
      color: '#0EA5E9',
    },
    {
      titulo: 'Segurança de Rede',
      icon: '📡',
      rota: '/rede-trilha',
      concluida: redeConcluidas === 5,
      progress: progressoRede,
      color: '#F97316',
    },
  ];

  const proximaTrilha = trilhas.find((trilha) => !trilha.concluida) || null;
  const todasConcluidas = !proximaTrilha;

  const progressoGeral = `${Math.round(
    trilhas.reduce((total, trilha) => total + parseInt(trilha.progress), 0) /
      trilhas.length
  )}%`;

  if (carregando) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.bg }]}>
        <Text style={[styles.loadingText, { color: colors.primary }]}>
          Carregando missões...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={[styles.hello, { color: colors.text }]}>
          Olá, {nome || 'Guardião'} 👋
        </Text>

        <Text style={[styles.title, { color: colors.title }]}>Missões</Text>

        <View style={styles.heroCard}>
          <Text style={styles.badge}>CYBERSECURITY</Text>

          <Text style={styles.heroTitle}>
            {todasConcluidas ? 'Jornada Concluída' : 'Continuar de onde parou'}
          </Text>

          <Text style={styles.heroSubtitle}>
            {todasConcluidas
              ? 'Parabéns! Você concluiu todas as trilhas disponíveis.'
              : proximaTrilha?.titulo}
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Progresso geral</Text>
            <Text style={styles.progressValue}>{progressoGeral}</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: progressoGeral }]} />
          </View>

          {!todasConcluidas && proximaTrilha && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push(proximaTrilha.rota as any)}
            >
              <Text style={styles.startText}>Continuar jornada</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={[styles.section, { color: colors.title }]}>Trilhas</Text>

        {trilhas.map((trilha) => (
          <MissionCard
            key={trilha.titulo}
            icon={trilha.icon}
            title={trilha.titulo}
            progress={trilha.progress}
            color={trilha.color}
            dark={dark}
            onPress={() => router.push(trilha.rota as any)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function MissionCard({
  icon,
  title,
  progress,
  color,
  dark,
  onPress,
}: {
  icon: string;
  title: string;
  progress: string;
  color: string;
  dark: boolean;
  onPress?: () => void;
}) {
  const colors = getColors(dark);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.title }]}>{title}</Text>

        <View style={[styles.smallBar, { backgroundColor: colors.barBg }]}>
          <View style={[styles.smallFill, { width: progress }]} />
        </View>
      </View>

      <Text style={styles.cardProgress}>{progress}</Text>
    </TouchableOpacity>
  );
}

function getColors(dark: boolean) {
  return {
    bg: dark ? '#0F172A' : '#EEF4FF',
    card: dark ? '#1E293B' : '#FFFFFF',
    title: dark ? '#F8FAFC' : '#243B53',
    text: dark ? '#CBD5E1' : '#52606D',
    barBg: dark ? '#334155' : '#E2E8F0',
    primary: '#2E5BFF',
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
  },

  hello: {
    marginTop: 40,
    fontSize: 16,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  heroCard: {
    backgroundColor: '#2E5BFF',
    borderRadius: 26,
    padding: 24,
    marginBottom: 28,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF33',
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  heroTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  heroSubtitle: {
    color: '#E0EAFF',
    fontSize: 17,
    marginTop: 5,
    marginBottom: 20,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    color: '#FFF',
    fontWeight: '600',
  },

  progressValue: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  progressBar: {
    height: 11,
    backgroundColor: '#BFD1FF',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  progressFill: {
    height: 11,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },

  startButton: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  startText: {
    color: '#2E5BFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  section: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 15,
  },

  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 24,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  smallBar: {
    height: 8,
    borderRadius: 20,
  },

  smallFill: {
    height: 8,
    backgroundColor: '#2E5BFF',
    borderRadius: 20,
  },

  cardProgress: {
    marginLeft: 12,
    color: '#2E5BFF',
    fontWeight: 'bold',
  },
});
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

export default function DashboardScreen() {
  const [email, setEmail] = useState('');
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState('Aprendiz em Cibersegurança');
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

  const [criptografia1Concluida, setCriptografia1Concluida] =
    useState(false);
  const [criptografia2Concluida, setCriptografia2Concluida] =
    useState(false);
  const [criptografia3Concluida, setCriptografia3Concluida] =
    useState(false);
  const [criptografia4Concluida, setCriptografia4Concluida] =
    useState(false);
  const [criptografia5Concluida, setCriptografia5Concluida] =
    useState(false);

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

  function calcularNivel(xpTotal: number) {
    const titulos = [
      'Aprendiz em Cibersegurança',
      'Usuário Consciente',
      'Guardião Digital',
      'Investigador Cyber',
      'Defensor da Rede',
      'Especialista em Segurança',
    ];

    const nivelAtual = Math.floor(xpTotal / 750);
    setNivel(titulos[nivelAtual] || 'Especialista em Segurança');
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
        setTema(dados.tema || 'claro');

        setXp(xpAtual);
        calcularNivel(xpAtual);

        setFundamentos1Concluida(
          dados.fundamentos1Concluida || false
        );
        setFundamentos2Concluida(
          dados.fundamentos2Concluida || false
        );
        setFundamentos3Concluida(
          dados.fundamentos3Concluida || false
        );
        setFundamentos4Concluida(
          dados.fundamentos4Concluida || false
        );
        setFundamentos5Concluida(
          dados.fundamentos5Concluida || false
        );

        setPhishing1Concluida(dados.phishing1Concluida || false);
        setPhishing2Concluida(dados.phishing2Concluida || false);
        setPhishing3Concluida(dados.phishing3Concluida || false);
        setPhishing4Concluida(dados.phishing4Concluida || false);
        setPhishing5Concluida(dados.phishing5Concluida || false);

        setCriptografia1Concluida(
          dados.criptografia1Concluida || false
        );
        setCriptografia2Concluida(
          dados.criptografia2Concluida || false
        );
        setCriptografia3Concluida(
          dados.criptografia3Concluida || false
        );
        setCriptografia4Concluida(
          dados.criptografia4Concluida || false
        );
        setCriptografia5Concluida(
          dados.criptografia5Concluida || false
        );

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

    return unsubscribe;
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

  const totalConcluidas =
    fundamentosConcluidas +
    phishingConcluidas +
    criptografiaConcluidas +
    webConcluidas +
    redeConcluidas;

  const totalMissoes = 25;
  const progressoTotal = Math.round(
    (totalConcluidas / totalMissoes) * 100
  );

  const progressoFundamentos = Math.round(
    (fundamentosConcluidas / 5) * 100
  );

  const progressoPhishing = Math.round(
    (phishingConcluidas / 5) * 100
  );

  const progressoCriptografia = Math.round(
    (criptografiaConcluidas / 5) * 100
  );

  const progressoWeb = Math.round((webConcluidas / 5) * 100);

  const progressoRede = Math.round((redeConcluidas / 5) * 100);

  if (carregando) {
    return (
      <View
        style={[
          styles.loading,
          { backgroundColor: colors.bg },
        ]}
      >
        <Text style={styles.loadingText}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: colors.bg },
      ]}
    >
      <Sidebar />

      <ScrollView style={styles.container}>
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.card },
          ]}
        >
          <View style={styles.profileInfo}>
            <Text
              style={[
                styles.hello,
                { color: colors.title },
              ]}
            >
              Olá, {nome || 'Guardião'} 👋
            </Text>

            <Text
              style={[
                styles.rank,
                { color: colors.text },
              ]}
            >
              {nivel}
            </Text>
          </View>

          <View style={styles.avatarBox}>
            <Text style={styles.avatar}>🛡️</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card },
            ]}
          >
            <Text style={styles.statNumber}>{xp}</Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.text },
              ]}
            >
              XP
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card },
            ]}
          >
            <Text style={styles.statNumber}>
              {totalConcluidas}
            </Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.text },
              ]}
            >
              Missões
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card },
            ]}
          >
            <Text style={styles.statNumber}>
              {progressoTotal}%
            </Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.text },
              ]}
            >
              Progresso
            </Text>
          </View>
        </View>

        <View style={styles.journeyCard}>
          <Text style={styles.journeyBadge}>
            CONTINUAR
          </Text>

          <Text style={styles.journeyTitle}>
            Sua jornada cyber
          </Text>

          <Text style={styles.journeyText}>
            Continue evoluindo e desbloqueando novas
            trilhas.
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressoTotal}%` },
              ]}
            />
          </View>

          <Text style={styles.journeyProgress}>
            Progresso total {progressoTotal}%
          </Text>
        </View>

        <Text
          style={[
            styles.section,
            { color: colors.title },
          ]}
        >
          Trilhas disponíveis
        </Text>

        <View style={styles.grid}>
          <TrailCard
            icon="🔒"
            title="Fundamentos"
            progress={progressoFundamentos}
            missions={fundamentosConcluidas}
            colors={colors}
            onPress={() =>
              router.push('/fundamentos-trilha')
            }
          />

          <TrailCard
            icon="🎣"
            title="Phishing"
            progress={progressoPhishing}
            missions={phishingConcluidas}
            colors={colors}
            onPress={() =>
              router.push('/phishing-trilha')
            }
          />

          <TrailCard
            icon="🔐"
            title="Criptografia"
            progress={progressoCriptografia}
            missions={criptografiaConcluidas}
            colors={colors}
            onPress={() =>
              router.push('/criptografia-trilha')
            }
          />

          <TrailCard
            icon="🌐"
            title="Web"
            progress={progressoWeb}
            missions={webConcluidas}
            colors={colors}
            onPress={() => router.push('/web-trilha')}
          />

          <TrailCard
            icon="📡"
            title="Redes"
            progress={progressoRede}
            missions={redeConcluidas}
            colors={colors}
            onPress={() => router.push('/rede-trilha')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function TrailCard({
  icon,
  title,
  progress,
  missions,
  colors,
  onPress,
}: {
  icon: string;
  title: string;
  progress: number;
  missions: number;
  colors: ReturnType<typeof getColors>;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.trailCard,
        { backgroundColor: colors.card },
      ]}
      onPress={onPress}
    >
      <Text style={styles.trailIcon}>{icon}</Text>

      <Text
        style={[
          styles.trailTitle,
          { color: colors.title },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.trailMissions,
          { color: colors.text },
        ]}
      >
        {missions}/5 missões
      </Text>

      <View
        style={[
          styles.trailBar,
          { backgroundColor: colors.bar },
        ]}
      >
        <View
          style={[
            styles.trailFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      <Text style={styles.trailProgress}>
        {progress}%
      </Text>
    </TouchableOpacity>
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
    paddingHorizontal: 14,
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

  profileCard: {
    borderRadius: 20,
    padding: 16,
    marginTop: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileInfo: {
    flex: 1,
  },

  hello: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  rank: {
    marginTop: 4,
    fontWeight: '600',
    fontSize: 13,
  },

  avatarBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2E5BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  avatar: {
    fontSize: 24,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5BFF',
  },

  statLabel: {
    marginTop: 3,
    fontSize: 12,
  },

  journeyCard: {
    backgroundColor: '#2E5BFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
  },

  journeyBadge: {
    color: '#DCEBFF',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 12,
  },

  journeyTitle: {
    color: '#FFF',
    fontSize: 21,
    fontWeight: 'bold',
  },

  journeyText: {
    color: '#E0EAFF',
    marginTop: 8,
    marginBottom: 18,
    fontSize: 13,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#BFD1FF',
    borderRadius: 20,
  },

  progressFill: {
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },

  journeyProgress: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 13,
  },

  section: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 30,
  },

  trailCard: {
    width: '100%',
    borderRadius: 18,
    padding: 16,
    minHeight: 125,
  },

  trailIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  trailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  trailMissions: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '600',
  },

  trailBar: {
    height: 8,
    borderRadius: 20,
    marginTop: 12,
  },

  trailFill: {
    height: 8,
    backgroundColor: '#2E5BFF',
    borderRadius: 20,
  },

  trailProgress: {
    color: '#2E5BFF',
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 12,
  },
});
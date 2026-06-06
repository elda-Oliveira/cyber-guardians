import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

const perguntas = [
  {
    pergunta: 'O que é cibersegurança?',
    opcoes: [
      'Um jogo online',
      'Proteção de dados e sistemas',
      'Um tipo de computador',
    ],
    correta: 'Proteção de dados e sistemas',
  },
  {
    pergunta: 'Qual destes pode ser um ataque digital?',
    opcoes: [
      'Phishing',
      'Atualização do sistema',
      'Backup automático',
    ],
    correta: 'Phishing',
  },
  {
    pergunta: 'O que é uma boa prática de segurança?',
    opcoes: [
      'Usar senha fraca',
      'Compartilhar senha',
      'Ativar autenticação em duas etapas',
    ],
    correta: 'Ativar autenticação em duas etapas',
  },
];

export default function QuizFundamentos1Screen() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [xp, setXp] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';
  const perguntaAtual = perguntas[indiceAtual];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        setTema(dados.tema || 'claro');
      }
    });

    return unsubscribe;
  }, []);

  function responder(opcao: string) {
    let novoXp = xp;
    let novosAcertos = acertos;

    if (opcao === perguntaAtual.correta) {
      novoXp += 50;
      novosAcertos += 1;

      setXp(novoXp);
      setAcertos(novosAcertos);
    }

    const proximaPergunta = indiceAtual + 1;

    if (proximaPergunta < perguntas.length) {
      setIndiceAtual(proximaPergunta);
    } else {
      setFinalizado(true);
    }
  }

  async function finalizarMissao() {
    const user = auth.currentUser;

    if (!user) {
      router.replace('/login');
      return;
    }

    const userRef = doc(db, 'usuarios', user.uid);
    const userSnap = await getDoc(userRef);
    const dados = userSnap.exists() ? userSnap.data() : {};

    const xpAtual = dados.xp || 0;
    const melhorXpAnterior = dados.fundamentos1MelhorXp || 0;

    const diferenca = xp - melhorXpAnterior;
    const xpGanho = diferenca > 0 ? diferenca : 0;

    await updateDoc(userRef, {
      xp: xpAtual + xpGanho,
      fundamentos1Concluida: true,
      fundamentos1MelhorXp: Math.max(melhorXpAnterior, xp),
      fundamentos1UltimoXpGanho: xpGanho,
      fundamentos1Acertos: acertos,
    });

    router.push('/fundamentos-trilha');
  }

  if (finalizado) {
    return (
      <View style={styles.resultWrapper}>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>🎉 Missão concluída!</Text>

          <Text style={styles.resultText}>
            Você concluiu os fundamentos básicos de cibersegurança.
          </Text>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardTitle}>Recompensas</Text>

            <Text style={styles.rewardText}>⭐ XP ganho: +{xp} XP</Text>

            <Text style={styles.rewardText}>
              ✅ Acertos: {acertos}/{perguntas.length}
            </Text>

            <Text style={styles.rewardText}>
              🏅 Distintivo: Aprendiz Digital
            </Text>
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={finalizarMissao}
          >
            <Text style={styles.finishButtonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
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
      <ScrollView style={styles.container}>
        <Text style={styles.badge}>QUESTÃO {indiceAtual + 1}</Text>

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
            styles.progress,
            { color: dark ? '#CBD5E1' : '#52606D' },
          ]}
        >
          Progresso: {indiceAtual + 1}/{perguntas.length}
        </Text>

        <View
          style={[
            styles.questionCard,
            { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
          ]}
        >
          <Text
            style={[
              styles.question,
              { color: dark ? '#FFFFFF' : '#243B53' },
            ]}
          >
            {perguntaAtual.pergunta}
          </Text>
        </View>

        {perguntaAtual.opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[
              styles.option,
              { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
            ]}
            onPress={() => responder(opcao)}
          >
            <Text
              style={[
                styles.optionText,
                { color: dark ? '#FFFFFF' : '#243B53' },
              ]}
            >
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  badge: {
    marginTop: 45,
    alignSelf: 'flex-start',
    backgroundColor: '#2E5BFF',
    color: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },

  progress: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 24,
  },

  questionCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },

  question: {
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 32,
  },

  option: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  optionText: {
    fontSize: 17,
    fontWeight: '600',
  },

  resultWrapper: {
    flex: 1,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    padding: 24,
  },

  resultBox: {
    backgroundColor: 'transparent',
  },

  resultTitle: {
    fontSize: 34,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 12,
  },

  resultText: {
    color: '#ECFDF5',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
  },

  rewardCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },

  rewardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 12,
  },

  rewardText: {
    color: '#52606D',
    fontSize: 17,
    marginBottom: 8,
  },

  finishButton: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  finishButtonText: {
    color: '#22C55E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
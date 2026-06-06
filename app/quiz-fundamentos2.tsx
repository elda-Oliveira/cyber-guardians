import { router } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from './services/firebase';


const perguntas = [
  {
    pergunta: 'Qual dessas senhas é mais segura?',
    opcoes: ['123456', 'senha123', 'G#9kP!2zQ'],
    correta: 'G#9kP!2zQ',
  },
  {
    pergunta: 'O que NÃO devemos usar em senhas?',
    opcoes: [
      'Símbolos e números',
      'Informações pessoais',
      'Letras maiúsculas',
    ],
    correta: 'Informações pessoais',
  },
  {
    pergunta: 'Por que não devemos repetir senhas?',
    opcoes: [
      'Porque fica mais difícil lembrar',
      'Porque várias contas podem ser invadidas',
      'Porque o celular trava',
    ],
    correta: 'Porque várias contas podem ser invadidas',
  },
];

export default function QuizFundamentos1Screen() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [xp, setXp] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const perguntaAtual = perguntas[indiceAtual];

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
    const melhorXpAnterior = dados.fundamentos2MelhorXp || 0;

    const diferenca = xp - melhorXpAnterior;
    const xpGanho = diferenca > 0 ? diferenca : 0;

    await updateDoc(userRef, {
        xp: xpAtual + xpGanho,
        fundamentos2Concluida: true,
        fundamentos2MelhorXp: Math.max(melhorXpAnterior, xp),
        fundamentos2UltimoXpGanho: xpGanho,
        fundamentos2Acertos: acertos,
    });

    router.push('/fundamentos-trilha');
    }

  if (finalizado) {
    return (
      <View style={styles.resultWrapper}>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            🎉 Missão concluída!
          </Text>

          <Text style={styles.resultText}>
            Você concluiu os fundamentos básicos de cibersegurança.
          </Text>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardTitle}>
              Recompensas
            </Text>

            <Text style={styles.rewardText}>
              ⭐ XP ganho: +{xp} XP
            </Text>

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
            <Text style={styles.finishButtonText}>
              Finalizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.badge}>
          QUESTÃO {indiceAtual + 1}
        </Text>

        <Text style={styles.title}>
          Fundamentos de Cibersegurança
        </Text>

        <Text style={styles.progress}>
          Progresso: {indiceAtual + 1}/{perguntas.length}
        </Text>

        <View style={styles.questionCard}>
          <Text style={styles.question}>
            {perguntaAtual.pergunta}
          </Text>
        </View>

        {perguntaAtual.opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={styles.option}
            onPress={() => responder(opcao)}
          >
            <Text style={styles.optionText}>
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
    backgroundColor: '#EEF4FF',
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
    color: '#243B53',
    marginTop: 20,
  },

  progress: {
    color: '#52606D',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 24,
  },

  questionCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },

  question: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#243B53',
    lineHeight: 32,
  },

  option: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  optionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#243B53',
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
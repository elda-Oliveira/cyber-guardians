import { router } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from './services/firebase';

export default function ResultadoScreen() {
  const [xpGanho, setXpGanho] = useState(0);
  const [dicasUsadas, setDicasUsadas] = useState(0);
  const [foiRefeita, setFoiRefeita] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarResultado() {
      const user = auth.currentUser;

      if (!user) {
        router.replace('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();

        setXpGanho(dados.missao1UltimoXpGanho || 0);
        setDicasUsadas(dados.missao1DicasUsadas || 0);
        setFoiRefeita(dados.missao1JaRefeita || false);
      }

      setCarregando(false);
    }

    carregarResultado();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando resultado...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        {xpGanho > 0 ? '🏆' : '✅'}
      </Text>

      <Text style={styles.title}>
        Missão Concluída!
      </Text>

      <Text style={styles.subtitle}>
        Você identificou corretamente o golpe de phishing.
      </Text>

      {foiRefeita && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Você já havia concluído essa missão. Por isso, a recompensa foi reduzida.
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recompensas</Text>

        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>🎯 Pontuação da missão</Text>
          <Text style={styles.rewardValue}>
            {100 - (dicasUsadas * 10)} XP
          </Text>
        </View>

        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>⭐ XP adicionado</Text>

          <Text style={styles.rewardValue}>
            +{xpGanho} XP
          </Text>
        </View>

        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>🐾 Dicas usadas</Text>
          <Text style={styles.rewardValue}>{dicasUsadas}</Text>
        </View>

        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>🏅 Distintivo</Text>
          <Text style={styles.rewardValue}>Caçador de Phishing</Text>
        </View>
      </View>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackTitle}>🤖 Mensagem do Ciper</Text>

        <Text style={styles.feedbackText}>
          {dicasUsadas === 0
            ? 'Excelente! Você concluiu sem usar dicas e recebeu a pontuação máxima.'
            : `Muito bem! Você usou ${dicasUsadas} dica(s), então sua pontuação foi ajustada.`}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.buttonText}>Voltar ao Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/missoes')}
      >
        <Text style={styles.secondaryButtonText}>Próxima Missão</Text>
      </TouchableOpacity>
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

  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#243B53',
  },

  subtitle: {
    textAlign: 'center',
    color: '#52606D',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 20,
  },

  warningBox: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  warningText: {
    color: '#92400E',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 18,
  },

  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  rewardLabel: {
    color: '#52606D',
    fontSize: 16,
  },

  rewardValue: {
    color: '#2E5BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  feedbackBox: {
    backgroundColor: '#DDF2FF',
    borderWidth: 2,
    borderColor: '#60A5FA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 10,
  },

  feedbackText: {
    color: '#243B53',
    lineHeight: 22,
  },

  button: {
    backgroundColor: '#2E5BFF',
    padding: 17,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 14,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2E5BFF',
    padding: 17,
    borderRadius: 18,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#2E5BFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
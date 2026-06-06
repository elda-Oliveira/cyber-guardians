import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Missao2Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>MISSÃO 2</Text>

        <Text style={styles.title}>Spear Phishing</Text>

        <Text style={styles.subtitle}>
          Entenda como golpistas usam informações pessoais para criar ataques mais convincentes.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>O que é Spear Phishing?</Text>
            <Text style={styles.cardText}>
              É um tipo de phishing direcionado, criado para enganar uma pessoa ou empresa específica.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Por que é perigoso?</Text>
            <Text style={styles.cardText}>
              O golpe parece mais real porque pode usar seu nome, cargo, empresa ou informações conhecidas sobre você.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Como identificar?</Text>
            <Text style={styles.cardText}>
              Desconfie de mensagens urgentes, links suspeitos, pedidos de senha, arquivos inesperados e remetentes parecidos com os reais.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>

          <Text style={styles.quizText}>
            Analise uma mensagem suspeita e descubra se é spear phishing.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/quiz-spear-phishing')}
          >
            <Text style={styles.buttonText}>Iniciar Missão</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, flexDirection: 'row', backgroundColor: '#EEF4FF' },
  container: { flex: 1, padding: 20 },
  badge: {
    marginTop: 40,
    alignSelf: 'flex-start',
    backgroundColor: '#FF9800',
    color: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#243B53',
    marginTop: 16,
  },
  subtitle: {
    color: '#52606D',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
  },
  cardNumber: {
    backgroundColor: '#FF9800',
    color: '#FFF',
    width: 38,
    height: 38,
    borderRadius: 19,
    textAlign: 'center',
    lineHeight: 38,
    fontWeight: 'bold',
    marginRight: 14,
  },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 6,
  },
  cardText: {
    color: '#52606D',
    lineHeight: 21,
  },
  quizBox: {
    backgroundColor: '#FF9800',
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
    color: '#FFF3E0',
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
    color: '#FF9800',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
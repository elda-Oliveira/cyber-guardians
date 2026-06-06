// app/phishing3.tsx

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Phishing3Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>PHISHING • MISSÃO 3</Text>

        <Text style={styles.title}>Whaling</Text>

        <Text style={styles.subtitle}>
          Entenda ataques de phishing direcionados a pessoas importantes, como chefes, diretores e gestores.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ataque contra cargos altos</Text>
            <Text style={styles.cardText}>
              Whaling é um tipo de phishing que mira pessoas com grande responsabilidade dentro de uma empresa.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Pedidos financeiros</Text>
            <Text style={styles.cardText}>
              O golpe pode envolver transferências, pagamentos urgentes ou envio de documentos confidenciais.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Como evitar?</Text>
            <Text style={styles.cardText}>
              Sempre confirme pedidos importantes por outro canal, como ligação, reunião ou contato oficial.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>

          <Text style={styles.quizText}>
            Analise uma mensagem suspeita e identifique se é um ataque de whaling.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/quiz-phishing3')}
          >
            <Text style={styles.buttonText}>Iniciar Quiz</Text>
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
    backgroundColor: '#EF4444',
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
    backgroundColor: '#EF4444',
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
    backgroundColor: '#EF4444',
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
    color: '#FEE2E2',
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
    color: '#EF4444',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
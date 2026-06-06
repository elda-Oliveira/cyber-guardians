// app/phishing2.tsx

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Phishing2Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>PHISHING • MISSÃO 2</Text>

        <Text style={styles.title}>
          Spear Phishing
        </Text>

        <Text style={styles.subtitle}>
          Entenda golpes personalizados feitos para atingir vítimas específicas.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ataque direcionado</Text>

            <Text style={styles.cardText}>
              O spear phishing usa informações pessoais para parecer mais convincente.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Uso de confiança</Text>

            <Text style={styles.cardText}>
              Criminosos podem fingir ser colegas, empresas ou conhecidos da vítima.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Proteção</Text>

            <Text style={styles.cardText}>
              Sempre confirme pedidos incomuns e desconfie de mensagens urgentes.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>

          <Text style={styles.quizText}>
            Responda perguntas sobre ataques direcionados.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/quiz-phishing2')}
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
    backgroundColor: '#F59E0B',
    color: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  title: { fontSize: 31, fontWeight: 'bold', color: '#243B53', marginTop: 16 },
  subtitle: { color: '#52606D', fontSize: 16, marginTop: 10, marginBottom: 24 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 15, flexDirection: 'row' },
  cardNumber: {
    backgroundColor: '#F59E0B',
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#243B53', marginBottom: 6 },
  cardText: { color: '#52606D', lineHeight: 21 },
  quizBox: {
    backgroundColor: '#F59E0B',
    borderRadius: 22,
    padding: 22,
    marginTop: 10,
    marginBottom: 30,
  },
  quizTitle: { color: '#FFF', fontSize: 23, fontWeight: 'bold' },
  quizText: { color: '#FEF3C7', marginTop: 8, marginBottom: 18 },
  button: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#F59E0B', fontSize: 17, fontWeight: 'bold' },
});
// app/phishing5.tsx

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Phishing5Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>PHISHING • MISSÃO 5</Text>

        <Text style={styles.title}>Clone Phishing</Text>

        <Text style={styles.subtitle}>
          Entenda golpes que copiam mensagens reais para enganar a vítima.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Mensagem copiada</Text>
            <Text style={styles.cardText}>
              No clone phishing, o criminoso copia uma mensagem legítima e troca links ou anexos por versões maliciosas.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Parece real</Text>
            <Text style={styles.cardText}>
              Como a mensagem é parecida com uma comunicação verdadeira, o golpe pode ser difícil de perceber.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Verifique antes</Text>
            <Text style={styles.cardText}>
              Confira remetente, links, anexos e se você realmente esperava aquela mensagem.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>
          <Text style={styles.quizText}>
            Analise uma mensagem parecida com uma comunicação real.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz-phishing5')}>
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
  badge: { marginTop: 40, alignSelf: 'flex-start', backgroundColor: '#64748B', color: '#FFF', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, fontWeight: 'bold' },
  title: { fontSize: 31, fontWeight: 'bold', color: '#243B53', marginTop: 16 },
  subtitle: { color: '#52606D', fontSize: 16, marginTop: 10, marginBottom: 24 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 15, flexDirection: 'row' },
  cardNumber: { backgroundColor: '#64748B', color: '#FFF', width: 38, height: 38, borderRadius: 19, textAlign: 'center', lineHeight: 38, fontWeight: 'bold', marginRight: 14 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#243B53', marginBottom: 6 },
  cardText: { color: '#52606D', lineHeight: 21 },
  quizBox: { backgroundColor: '#64748B', borderRadius: 22, padding: 22, marginTop: 10, marginBottom: 30 },
  quizTitle: { color: '#FFF', fontSize: 23, fontWeight: 'bold' },
  quizText: { color: '#E2E8F0', marginTop: 8, marginBottom: 18 },
  button: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: '#64748B', fontSize: 17, fontWeight: 'bold' },
});
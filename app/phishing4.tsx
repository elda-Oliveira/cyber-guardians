// app/phishing4.tsx

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Phishing4Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>PHISHING • MISSÃO 4</Text>

        <Text style={styles.title}>Vishing</Text>

        <Text style={styles.subtitle}>
          Aprenda a identificar golpes feitos por ligação telefônica ou áudio.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Golpe por telefone</Text>
            <Text style={styles.cardText}>
              Vishing é quando criminosos usam ligações para tentar roubar senhas, códigos ou dados pessoais.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Falsa autoridade</Text>
            <Text style={styles.cardText}>
              O golpista pode fingir ser banco, suporte técnico, empresa ou até órgão público.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Como se proteger?</Text>
            <Text style={styles.cardText}>
              Nunca informe códigos por ligação. Desligue e procure o canal oficial da empresa.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>
          <Text style={styles.quizText}>
            Analise uma ligação suspeita e decida se é golpe.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz-phishing4')}>
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
  badge: { marginTop: 40, alignSelf: 'flex-start', backgroundColor: '#8B5CF6', color: '#FFF', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, fontWeight: 'bold' },
  title: { fontSize: 31, fontWeight: 'bold', color: '#243B53', marginTop: 16 },
  subtitle: { color: '#52606D', fontSize: 16, marginTop: 10, marginBottom: 24 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 15, flexDirection: 'row' },
  cardNumber: { backgroundColor: '#8B5CF6', color: '#FFF', width: 38, height: 38, borderRadius: 19, textAlign: 'center', lineHeight: 38, fontWeight: 'bold', marginRight: 14 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#243B53', marginBottom: 6 },
  cardText: { color: '#52606D', lineHeight: 21 },
  quizBox: { backgroundColor: '#8B5CF6', borderRadius: 22, padding: 22, marginTop: 10, marginBottom: 30 },
  quizTitle: { color: '#FFF', fontSize: 23, fontWeight: 'bold' },
  quizText: { color: '#EDE9FE', marginTop: 8, marginBottom: 18 },
  button: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: '#8B5CF6', fontSize: 17, fontWeight: 'bold' },
});
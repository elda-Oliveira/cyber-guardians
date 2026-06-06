// app/phishing1.tsx

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Phishing1Screen() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={styles.badge}>PHISHING • MISSÃO 1</Text>

        <Text style={styles.title}>
          Phishing Genérico
        </Text>

        <Text style={styles.subtitle}>
          Aprenda como funcionam os golpes mais comuns usados para roubar informações.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>1</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>O que é phishing?</Text>

            <Text style={styles.cardText}>
              É um golpe digital onde criminosos tentam enganar pessoas para roubar senhas, dados bancários e informações pessoais.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Como acontece?</Text>

            <Text style={styles.cardText}>
              Geralmente por e-mails, mensagens, links falsos e páginas que imitam empresas conhecidas.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>3</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Como evitar?</Text>

            <Text style={styles.cardText}>
              Nunca clique em links suspeitos e sempre confirme o endereço do site antes de informar seus dados.
            </Text>
          </View>
        </View>

        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Exercício Prático</Text>

          <Text style={styles.quizText}>
            Responda perguntas simples sobre phishing genérico.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/quiz-phishing1')}
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
    backgroundColor: '#22C55E',
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
    backgroundColor: '#22C55E',
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
    backgroundColor: '#22C55E',
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
    color: '#DCFCE7',
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
    color: '#22C55E',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
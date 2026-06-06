import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sidebar from '../components/Sidebar';

const missoes = [
  { titulo: 'O que é uma rede?', icon: '📡', rota: '/rede1', cor: '#F97316' },
  { titulo: 'IP, DNS e portas', icon: '🌍', rota: '/rede2', cor: '#F97316' },
  { titulo: 'Wi-Fi seguro', icon: '📶', rota: '/rede3', cor: '#F97316' },
  { titulo: 'Firewall', icon: '🔥', rota: '/rede4', cor: '#F97316' },
  { titulo: 'Ataques em redes', icon: '🚨', rota: '/rede5', cor: '#F97316' },
];

export default function RedeTrilhaScreen() {
  return <Trilha titulo="Segurança de Rede" subtitulo="Entenda como redes funcionam e como proteger conexões." missoes={missoes} />;
}

function Trilha({ titulo, subtitulo, missoes }: any) {
  return (
    <View style={styles.wrapper}>
      <Sidebar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.subtitle}>{subtitulo}</Text>

        {missoes.map((missao: any) => (
          <TouchableOpacity key={missao.titulo} style={styles.card} onPress={() => router.push(missao.rota as any)}>
            <View style={[styles.iconBox, { backgroundColor: missao.cor }]}>
              <Text style={styles.icon}>{missao.icon}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.cardTitle}>{missao.titulo}</Text>
              <View style={styles.bar}>
                <View style={[styles.fill, { width: '0%' }]} />
              </View>
            </View>

            <Text style={styles.progress}>0%</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, flexDirection: 'row', backgroundColor: '#EEF4FF' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#243B53', marginTop: 40 },
  subtitle: { color: '#52606D', marginTop: 8, marginBottom: 24, fontSize: 16 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 14, flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 55, height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  icon: { fontSize: 24 },
  content: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#243B53', marginBottom: 10 },
  bar: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 20 },
  fill: { height: 8, backgroundColor: '#2E5BFF', borderRadius: 20 },
  progress: { marginLeft: 12, fontWeight: 'bold', color: '#2E5BFF' },
});
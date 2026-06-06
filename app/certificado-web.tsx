import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Sidebar from '../components/Sidebar';
import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

export default function CertificadoWebScreen() {
  const [nome, setNome] = useState('Guardião Digital');
  const [xp, setXp] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();

        setTema(dados.tema || 'claro');

        setNome(
          dados.nome ||
          user.email?.split('@')[0] ||
          'Guardião Digital'
        );

        setXp(dados.xp || 0);
      } else {
        setNome(
          user.email?.split('@')[0] ||
          'Guardião Digital'
        );
      }

      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  if (carregando) {
    return (
      <View
        style={[
          styles.loading,
          { backgroundColor: dark ? '#020617' : '#EEF4FF' },
        ]}
      >
        <Text
          style={[
            styles.loadingText,
            { color: dark ? '#FCD34D' : '#F59E0B' },
          ]}
        >
          Carregando certificado...
        </Text>
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
      <Sidebar />

      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.certificate,
            {
              borderColor: '#F59E0B',
              backgroundColor: dark ? '#0F172A' : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.logo}>🌐</Text>

          <Text style={[styles.certHeader, { color: '#F59E0B' }]}>
            CERTIFICADO DE CONCLUSÃO
          </Text>

          <Text style={[styles.text, { color: dark ? '#CBD5E1' : '#52606D' }]}>
            Certificamos que
          </Text>

          <Text style={[styles.name, { color: dark ? '#FFFFFF' : '#243B53' }]}>
            {nome}
          </Text>

          <Text style={[styles.text, { color: dark ? '#CBD5E1' : '#52606D' }]}>
            concluiu com êxito a trilha
          </Text>

          <Text style={[styles.course, { color: '#F59E0B' }]}>
            Segurança em Aplicações Web
          </Text>

          <Text
            style={[
              styles.description,
              { color: dark ? '#CBD5E1' : '#52606D' },
            ]}
          >
            Demonstrando conhecimentos introdutórios sobre segurança web,
            ataques online e proteção de aplicações.
          </Text>

          <View
            style={[
              styles.infoBox,
              { backgroundColor: dark ? '#1E293B' : '#EEF4FF' },
            ]}
          >
            <Text style={[styles.info, { color: dark ? '#FFFFFF' : '#243B53' }]}>
              Carga horária: 15 horas
            </Text>

            <Text style={[styles.info, { color: dark ? '#FFFFFF' : '#243B53' }]}>
              XP acumulado: {xp} XP
            </Text>

            <Text style={[styles.info, { color: dark ? '#FFFFFF' : '#243B53' }]}>
              Data de emissão: {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text
              style={[
                styles.verify,
                { color: dark ? '#94A3B8' : '#64748B' },
              ]}
            >
              Certificado emitido digitalmente por
            </Text>

            <Text
              style={[
                styles.platform,
                { color: dark ? '#FFFFFF' : '#243B53' },
              ]}
            >
              Cyber Guardians
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>VERIFICADO ✓</Text>
            </View>

            <Text style={styles.code}>ID: CG-2026-45825</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  back: {
    marginTop: 18,
    marginBottom: 14,
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 14,
  },

  certificate: {
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 30,
  },

  logo: {
    fontSize: 38,
    marginBottom: 8,
  },

  certHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },

  text: {
    fontSize: 13,
    textAlign: 'center',
  },

  name: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },

  course: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },

  infoBox: {
    borderRadius: 14,
    padding: 12,
    width: '100%',
    marginTop: 6,
  },

  info: {
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 12,
  },

  footer: {
    marginTop: 22,
    alignItems: 'center',
  },

  verify: {
    marginBottom: 6,
    fontSize: 12,
    textAlign: 'center',
  },

  platform: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    marginTop: 10,
  },

  badgeText: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: 12,
  },

  code: {
    color: '#94A3B8',
    marginTop: 10,
    fontSize: 11,
  },
});
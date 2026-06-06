// app/certificado-redes.tsx

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

export default function CertificadoRedesScreen() {
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
            { color: dark ? '#FCA5A5' : '#EF4444' },
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
              borderColor: '#EF4444',
              backgroundColor: dark ? '#0F172A' : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.logo}>📡</Text>

          <Text style={[styles.certHeader, { color: '#EF4444' }]}>
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

          <Text style={[styles.course, { color: '#EF4444' }]}>
            Segurança de Redes
          </Text>

          <Text
            style={[
              styles.description,
              { color: dark ? '#CBD5E1' : '#52606D' },
            ]}
          >
            Demonstrando conhecimentos básicos sobre redes, proteção de
            conexões e monitoramento de tráfego.
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

            <Text style={styles.code}>ID: CG-2026-45824</Text>
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
    padding: 20,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  back: {
    marginTop: 30,
    marginBottom: 20,
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 16,
  },

  certificate: {
    borderRadius: 28,
    padding: 34,
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: 40,
  },

  logo: {
    fontSize: 58,
    marginBottom: 10,
  },

  certHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
  },

  text: {
    fontSize: 17,
    textAlign: 'center',
  },

  name: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 14,
    textAlign: 'center',
  },

  course: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 14,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },

  infoBox: {
    borderRadius: 18,
    padding: 18,
    width: '100%',
    marginTop: 10,
  },

  info: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  footer: {
    marginTop: 35,
    alignItems: 'center',
  },

  verify: {
    marginBottom: 8,
    textAlign: 'center',
  },

  platform: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },

  badgeText: {
    color: '#166534',
    fontWeight: 'bold',
  },

  code: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 12,
  },
});
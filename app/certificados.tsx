import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
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

export default function CertificadosScreen() {
  const [carregando, setCarregando] = useState(true);
  const [tema, setTema] = useState<Tema>('claro');

  const [fundamentos, setFundamentos] = useState(0);
  const [phishing, setPhishing] = useState(0);
  const [criptografia, setCriptografia] = useState(0);
  const [web, setWeb] = useState(0);
  const [redes, setRedes] = useState(0);

  const isDark = tema === 'escuro';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);

      const unsubscribeUser = onSnapshot(userRef, (userSnap) => {
        if (userSnap.exists()) {
          const dados = userSnap.data();

          setTema(dados.tema || 'claro');

          const fundamentosConcluidas = [
            dados.fundamentos1Concluida,
            dados.fundamentos2Concluida,
            dados.fundamentos3Concluida,
            dados.fundamentos4Concluida,
            dados.fundamentos5Concluida,
          ].filter(Boolean).length;

          const phishingConcluidas = [
            dados.phishing1Concluida,
            dados.phishing2Concluida,
            dados.phishing3Concluida,
            dados.phishing4Concluida,
            dados.phishing5Concluida,
          ].filter(Boolean).length;

          const criptografiaConcluidas = [
            dados.criptografia1Concluida,
            dados.criptografia2Concluida,
            dados.criptografia3Concluida,
            dados.criptografia4Concluida,
            dados.criptografia5Concluida,
          ].filter(Boolean).length;

          const webConcluidas = [
            dados.web1Concluida,
            dados.web2Concluida,
            dados.web3Concluida,
            dados.web4Concluida,
            dados.web5Concluida,
          ].filter(Boolean).length;

          const redesConcluidas = [
            dados.rede1Concluida,
            dados.rede2Concluida,
            dados.rede3Concluida,
            dados.rede4Concluida,
            dados.rede5Concluida,
          ].filter(Boolean).length;

          setFundamentos(Math.round((fundamentosConcluidas / 5) * 100));
          setPhishing(Math.round((phishingConcluidas / 5) * 100));
          setCriptografia(Math.round((criptografiaConcluidas / 5) * 100));
          setWeb(Math.round((webConcluidas / 5) * 100));
          setRedes(Math.round((redesConcluidas / 5) * 100));
        }

        setCarregando(false);
      });

      return unsubscribeUser;
    });

    return unsubscribeAuth;
  }, []);

  const certificados = [
    {
      titulo: 'Fundamentos de Cibersegurança',
      progresso: fundamentos,
      icon: '🔒',
      rota: '/certificado-fundamentos',
      cor: '#2563EB',
    },
    {
      titulo: 'Phishing e Engenharia Social',
      progresso: phishing,
      icon: '🎣',
      rota: '/certificado-phishing',
      cor: '#22C55E',
    },
    {
      titulo: 'Criptografia',
      progresso: criptografia,
      icon: '🔐',
      rota: '/certificado-criptografia',
      cor: '#8B5CF6',
    },
    {
      titulo: 'Segurança Web',
      progresso: web,
      icon: '🌐',
      rota: '/certificado-web',
      cor: '#F59E0B',
    },
    {
      titulo: 'Segurança de Redes',
      progresso: redes,
      icon: '📡',
      rota: '/certificado-redes',
      cor: '#EF4444',
    },
  ];

  if (carregando) {
    return (
      <View
        style={[
          styles.loading,
          { backgroundColor: isDark ? '#020617' : '#EEF4FF' },
        ]}
      >
        <Text
          style={[
            styles.loadingText,
            { color: isDark ? '#60A5FA' : '#2563EB' },
          ]}
        >
          Carregando certificados...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isDark ? '#020617' : '#EEF4FF' },
      ]}
    >
      <Sidebar />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: isDark ? '#FFFFFF' : '#243B53' },
            ]}
          >
            Certificados
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: isDark ? '#CBD5E1' : '#52606D' },
            ]}
          >
            Complete as trilhas para desbloquear seus certificados.
          </Text>
        </View>

        {certificados.map((certificado) => {
          const desbloqueado = certificado.progresso === 100;

          return (
            <TouchableOpacity
              key={certificado.titulo}
              style={[
                styles.card,
                { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' },
              ]}
              disabled={!desbloqueado}
              onPress={() => router.push(certificado.rota as any)}
            >
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: certificado.cor },
                ]}
              >
                <Text style={styles.icon}>{certificado.icon}</Text>
              </View>

              <View style={styles.content}>
                <View style={styles.topRow}>
                  <Text
                    style={[
                      styles.certTitle,
                      { color: isDark ? '#FFFFFF' : '#243B53' },
                    ]}
                  >
                    {certificado.titulo}
                  </Text>

                  <Text
                    style={[
                      styles.status,
                      {
                        color: desbloqueado
                          ? '#16A34A'
                          : isDark
                          ? '#94A3B8'
                          : '#64748B',
                      },
                    ]}
                  >
                    {desbloqueado ? 'Desbloqueado' : 'Bloqueado'}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.certText,
                    { color: isDark ? '#CBD5E1' : '#52606D' },
                  ]}
                >
                  {desbloqueado
                    ? 'Seu certificado já está disponível.'
                    : 'Conclua todas as 5 missões para liberar.'}
                </Text>

                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${certificado.progresso}%`,
                        backgroundColor: certificado.cor,
                      },
                    ]}
                  />
                </View>

                <View style={styles.bottomRow}>
                  <Text
                    style={[
                      styles.progressText,
                      { color: isDark ? '#FFFFFF' : '#243B53' },
                    ]}
                  >
                    {certificado.progresso}% concluído
                  </Text>

                  <Text
                    style={[
                      styles.missions,
                      { color: isDark ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {Math.round(certificado.progresso / 20)}/5 missões
                  </Text>
                </View>

                {desbloqueado && (
                  <View
                    style={[
                      styles.downloadButton,
                      { backgroundColor: isDark ? '#1E293B' : '#EEF4FF' },
                    ]}
                  >
                    <Text style={styles.downloadText}>
                      🏆 Visualizar Certificado
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
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
    fontSize: 16,
    fontWeight: 'bold',
  },

  header: {
    marginTop: 18,
    marginBottom: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  card: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: 26,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  certTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  status: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  certText: {
    marginTop: 8,
    lineHeight: 18,
    fontSize: 12,
  },

  progressBar: {
    height: 8,
    borderRadius: 20,
    marginTop: 14,
  },

  progressFill: {
    height: 8,
    borderRadius: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  progressText: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  missions: {
    fontWeight: '600',
    fontSize: 12,
  },

  downloadButton: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
  },

  downloadText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
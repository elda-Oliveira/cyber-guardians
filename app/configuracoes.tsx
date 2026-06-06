import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Sidebar from '../components/Sidebar';
import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

export default function ConfiguracoesScreen() {
  const [nome, setNome] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [userId, setUserId] = useState('');
  const [modalTipo, setModalTipo] = useState<string | null>(null);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';
  const colors = getColors(dark);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      setUserId(user.uid);

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        const nomeSalvo = dados.nome || user.email?.split('@')[0] || 'Guardião';

        setNome(nomeSalvo);
        setNovoNome(nomeSalvo);
        setTema(dados.tema || 'claro');
      }
    });

    return unsubscribe;
  }, []);

  async function alterarTema(novoTema: Tema) {
    setTema(novoTema);

    if (userId) {
      await updateDoc(doc(db, 'usuarios', userId), {
        tema: novoTema,
      });
    }
  }

  async function salvarNome() {
    if (!novoNome.trim()) {
      Alert.alert('Atenção', 'Digite um nome válido.');
      return;
    }

    if (!userId) return;

    await updateDoc(doc(db, 'usuarios', userId), {
      nome: novoNome.trim(),
    });

    setNome(novoNome.trim());
    setModalTipo(null);

    Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
  }

  function abrirEmailSuporte() {
    const assunto = encodeURIComponent('Suporte - Cyber Guardians');
    const corpo = encodeURIComponent(
      `Olá, equipe Cyber Guardians.\n\nPreciso de ajuda com:\n\n`
    );

    Linking.openURL(
      `mailto:suporte@cyberguardians.com?subject=${assunto}&body=${corpo}`
    );
  }

  function textoModal() {
    if (modalTipo === 'seguranca') {
      return {
        titulo: 'Segurança',
        texto:
          'Mantenha sua conta protegida usando senhas fortes, não compartilhando seus dados de acesso e evitando dispositivos públicos. Nunca informe sua senha para terceiros.',
      };
    }

    if (modalTipo === 'privacidade') {
      return {
        titulo: 'Privacidade',
        texto:
          'O Cyber Guardians utiliza seus dados apenas para salvar seu progresso, XP, certificados e informações da conta. Nenhuma informação sensível deve ser compartilhada dentro das missões.',
      };
    }

    if (modalTipo === 'termos') {
      return {
        titulo: 'Termos e Políticas',
        texto:
          'Ao utilizar o Cyber Guardians, você concorda em usar a plataforma para fins educacionais. O conteúdo tem objetivo introdutório e não substitui treinamentos profissionais avançados.',
      };
    }

    return {
      titulo: '',
      texto: '',
    };
  }

  const modalInfo = textoModal();

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
      <Sidebar />

      <ScrollView style={styles.container}>
        <Text style={[styles.title, { color: colors.title }]}>Configurações</Text>

        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <Text style={styles.avatar}>👤</Text>

          <View>
            <Text style={[styles.profileName, { color: colors.title }]}>
              {nome || 'Guardião'}
            </Text>
            <Text style={[styles.profileText, { color: colors.text }]}>
              Conta Cyber Guardians
            </Text>
          </View>
        </View>

        {[
          ['Editar conta', 'editar'],
          ['Segurança', 'seguranca'],
          ['Privacidade', 'privacidade'],
          ['Termos e Políticas', 'termos'],
        ].map(([label, tipo]) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.option, { backgroundColor: colors.card }]}
            onPress={() => setModalTipo(tipo)}
          >
            <Text style={[styles.optionText, { color: colors.title }]}>{label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.card }]}
          onPress={abrirEmailSuporte}
        >
          <Text style={[styles.optionText, { color: colors.title }]}>
            Ajuda e Suporte
          </Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={[styles.themeBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.themeTitle, { color: colors.title }]}>Tema</Text>

          <View style={styles.themeOptions}>
            <TouchableOpacity onPress={() => alterarTema('claro')}>
              <Text style={tema === 'claro' ? styles.themeActive : styles.theme}>
                Claro
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alterarTema('escuro')}>
              <Text style={tema === 'escuro' ? styles.themeActive : styles.theme}>
                Escuro
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalTipo !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            {modalTipo === 'editar' ? (
              <>
                <Text style={[styles.modalTitle, { color: colors.title }]}>
                  Editar conta
                </Text>

                <Text style={[styles.modalLabel, { color: colors.text }]}>
                  Nome de exibição
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.input,
                      color: colors.title,
                    },
                  ]}
                  value={novoNome}
                  onChangeText={setNovoNome}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#94A3B8"
                />

                <TouchableOpacity style={styles.saveButton} onPress={salvarNome}>
                  <Text style={styles.saveButtonText}>Salvar alterações</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.modalTitle, { color: colors.title }]}>
                  {modalInfo.titulo}
                </Text>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  {modalInfo.texto}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.close }]}
              onPress={() => setModalTipo(null)}
            >
              <Text style={[styles.closeButtonText, { color: colors.title }]}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getColors(dark: boolean) {
  return {
    bg: dark ? '#0F172A' : '#EEF4FF',
    card: dark ? '#1E293B' : '#FFFFFF',
    title: dark ? '#F8FAFC' : '#243B53',
    text: dark ? '#CBD5E1' : '#52606D',
    input: dark ? '#334155' : '#EEF4FF',
    close: dark ? '#334155' : '#E2E8F0',
  };
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, flexDirection: 'row' },
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  profileCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    fontSize: 42,
    marginRight: 15,
  },

  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  profileText: {
    marginTop: 4,
  },

  option: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 24,
    color: '#2E5BFF',
  },

  themeBox: {
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },

  themeTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },

  themeOptions: {
    flexDirection: 'row',
    gap: 15,
  },

  themeActive: {
    backgroundColor: '#2E5BFF',
    color: '#FFF',
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },

  theme: {
    backgroundColor: '#E2E8F0',
    color: '#243B53',
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalBox: {
    borderRadius: 22,
    padding: 24,
    width: '100%',
    maxWidth: 500,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  modalLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 18,
  },

  saveButton: {
    backgroundColor: '#2E5BFF',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  closeButton: {
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  closeButtonText: {
    fontWeight: 'bold',
  },
});
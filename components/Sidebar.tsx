import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { auth, db } from '../app/services/firebase';

type Tema = 'claro' | 'escuro';

export default function Sidebar() {
  const [tema, setTema] = useState<Tema>('claro');
  const [userId, setUserId] = useState('');

  const dark = tema === 'escuro';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      setUserId(user.uid);

      const userRef = doc(db, 'usuarios', user.uid);

      const unsubscribeTema = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          const dados = snap.data();
          setTema(dados.tema || 'claro');
        }
      });

      return unsubscribeTema;
    });

    return unsubscribeAuth;
  }, []);

  async function alterarTema() {
    if (!userId) return;

    const novoTema: Tema = dark ? 'claro' : 'escuro';

    await updateDoc(doc(db, 'usuarios', userId), {
      tema: novoTema,
    });
  }

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: dark ? '#0F172A' : '#FFFFFF',
        },
      ]}
    >
      <View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/perfil')}
        >
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.activeButton,
            {
              backgroundColor: dark ? '#1E293B' : '#ECECEC',
            },
          ]}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/missoes')}
        >
          <Text style={styles.icon}>🎯</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/certificados')}
        >
          <Text style={styles.icon}>🏆</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/configuracoes')}
        >
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.icon}>↩️</Text>
        </TouchableOpacity>

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 85,
    height: '100%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  iconButton: {
    marginBottom: 20,
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeButton: {
    marginBottom: 20,
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  themeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 22,
  },

  themeText: {
    fontSize: 20,
  },
});
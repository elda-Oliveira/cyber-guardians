// app/quiz-phishing3.tsx

import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from './services/firebase';

type Tema = 'claro' | 'escuro';

const dicas = [
  {
    titulo: 'Dica 1 - Comunicação oficial',
    texto:
      '🐱 Detetive Miau: “A mensagem orienta utilizar canais oficiais da empresa.”',
  },
  {
    titulo: 'Dica 2 - Segurança',
    texto:
      '🐱 Detetive Miau: “Percebeu que não existe pedido de senha ou informações pessoais?”',
  },
  {
    titulo: 'Dica 3 - Verificação',
    texto:
      '🐱 Detetive Miau: “Mensagens legítimas normalmente incentivam contato direto com setores oficiais.”',
  },
];

export default function QuizPhishing3Screen() {
  const [dicasUsadas, setDicasUsadas] = useState(0);
  const [respondeu, setRespondeu] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [xp, setXp] = useState(150);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [dicaAtual, setDicaAtual] = useState(0);
  const [dicaUsada, setDicaUsada] = useState(false);
  const [mostrarFerramentas, setMostrarFerramentas] = useState(false);
  const [tema, setTema] = useState<Tema>('claro');

  const dark = tema === 'escuro';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const dados = userSnap.data();
        setTema(dados.tema || 'claro');
      }
    });

    return unsubscribe;
  }, []);

  function responder(valor: boolean) {
    setRespondeu(true);
    setAcertou(valor);
  }

  function usarDica() {
    if (dicasUsadas >= 3) {
      setMostrarAviso(false);
      return;
    }

    setXp((prev) => Math.max(prev - 10, 0));
    setDicasUsadas((prev) => prev + 1);
    setDicaUsada(true);
    setMostrarAviso(false);
  }

  function proximaDica() {
    if (dicaAtual < dicas.length - 1) {
      setDicaAtual(dicaAtual + 1);
      setDicaUsada(false);
    } else {
      setDicaUsada(false);
    }
  }

  async function finalizarQuiz() {
    const user = auth.currentUser;

    if (!user) {
      router.replace('/login');
      return;
    }

    const userRef = doc(db, 'usuarios', user.uid);
    const userSnap = await getDoc(userRef);
    const dados = userSnap.exists() ? userSnap.data() : {};

    const xpAtual = dados.xp || 0;
    const melhorXpAnterior = dados.phishing3MelhorXp || 0;

    const xpAtualMissao = Math.max(150 - dicasUsadas * 10, 0);
    const diferenca = xpAtualMissao - melhorXpAnterior;
    const xpGanho = diferenca > 0 ? diferenca : 0;

    await updateDoc(userRef, {
      xp: xpAtual + xpGanho,
      phishing3Concluida: true,
      phishing3MelhorXp: Math.max(melhorXpAnterior, xpAtualMissao),
      phishing3UltimoXpGanho: xpGanho,
      phishing3PontuacaoAtual: xpAtualMissao,
      phishing3DicasUsadas: dicasUsadas,
    });

    router.push('/phishing-trilha');
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: dark ? '#020617' : '#F8FBFF' },
      ]}
    >
      <ScrollView style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.xp}>⭐ {xp} XP</Text>
        </View>

        <View
          style={[
            styles.emailHeader,
            { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
          ]}
        >
          <Text style={[styles.emailTitle, { color: dark ? '#FFFFFF' : '#111827' }]}>
            ✉️ E-mail Num.3 de 5
          </Text>

          <Text style={[styles.small, { color: dark ? '#CBD5E1' : '#4B5563' }]}>
            De: financeiro@empresa.com
          </Text>

          <Text style={[styles.small, { color: dark ? '#CBD5E1' : '#4B5563' }]}>
            Tempo: 5 minutos atrás
          </Text>

          <Text style={[styles.subject, { color: dark ? '#FFFFFF' : '#111827' }]}>
            Assunto: Processo de aprovação financeira
          </Text>
        </View>

        <View
          style={[
            styles.emailBody,
            { backgroundColor: dark ? '#1E293B' : '#E5E7EB' },
          ]}
        >
          <Text style={[styles.mailText, { color: dark ? '#F8FAFC' : '#111827' }]}>
            Olá Diretor,
            {'\n\n'}
            Conforme alinhado na reunião de hoje, a aprovação do pagamento do
            fornecedor deverá ser feita apenas pelo sistema financeiro oficial
            da empresa.
            {'\n\n'}
            Nenhum link externo será enviado por e-mail.
            {'\n\n'}
            Em caso de dúvida, entre em contato diretamente com o setor
            financeiro pelo ramal interno 204.
            {'\n\n'}
            Atenciosamente,
            {'\n'}
            Equipe Financeira
          </Text>
        </View>

        <Text style={[styles.ciper, { color: dark ? '#FFFFFF' : '#111827' }]}>
          🤖 “Hmm... será que é um golpe?”
        </Text>

        <TouchableOpacity style={styles.redButton} onPress={() => responder(false)}>
          <Text style={styles.buttonText}>🚨 É uma armadilha!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.greenButton} onPress={() => responder(true)}>
          <Text style={styles.buttonText}>✅ Está tudo certo!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dicaButton}
          onPress={() => setMostrarAviso(true)}
          disabled={dicasUsadas >= 3}
        >
          <Text style={styles.dicaButtonText}>
            🐾 Dica do Ciper ({dicasUsadas}/3 usadas)
          </Text>
        </TouchableOpacity>

        {respondeu && (
          <View
            style={[
              styles.feedback,
              { backgroundColor: dark ? '#0F172A' : '#FFFFFF' },
            ]}
          >
            <Text style={[styles.feedbackTitle, { color: dark ? '#FFFFFF' : '#243B53' }]}>
              {acertou ? '✅ Você acertou!' : '❌ Essa mensagem parece legítima.'}
            </Text>

            <Text style={[styles.feedbackText, { color: dark ? '#CBD5E1' : '#52606D' }]}>
              {acertou
                ? 'A mensagem usa canais oficiais e não pede dados pessoais.'
                : 'Não existe urgência exagerada, link suspeito ou pedido de senha.'}
            </Text>

            {acertou ? (
              <TouchableOpacity style={styles.nextButton} onPress={finalizarQuiz}>
                <Text style={styles.nextText}>Finalizar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setRespondeu(false);
                  setAcertou(false);
                }}
              >
                <Text style={styles.nextText}>Tentar novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <TouchableOpacity onPress={() => setMostrarFerramentas(true)}>
          <Text style={[styles.tools, { color: dark ? '#FFFFFF' : '#111827' }]}>
            🕵️ Ferramentas de Detetive
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {mostrarAviso && (
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.avisoBox,
              { backgroundColor: dark ? '#0F172A' : '#D8E8FF' },
            ]}
          >
            <Text style={[styles.avisoTitle, { color: dark ? '#FFFFFF' : '#243B53' }]}>
              ⚠️ Usar dica custa XP!
            </Text>

            <Text style={[styles.avisoText, { color: dark ? '#CBD5E1' : '#243B53' }]}>
              Cada dica custa 10 XP.
            </Text>

            <Text style={[styles.avisoText, { color: dark ? '#CBD5E1' : '#243B53' }]}>
              Deseja continuar mesmo assim?
            </Text>

            <View style={styles.avisoButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setMostrarAviso(false)}
              >
                <Text style={styles.avisoButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.useButton} onPress={usarDica}>
                <Text style={styles.avisoButtonText}>Usar Dica</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {dicaUsada && (
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.hintBox,
              { backgroundColor: dark ? '#0F172A' : '#DDF2FF' },
            ]}
          >
            <Text style={styles.hintTitle}>{dicas[dicaAtual].titulo}</Text>

            <Text
              style={[
                styles.hintText,
                {
                  backgroundColor: dark ? '#1E293B' : '#F5E8FF',
                  color: dark ? '#FFFFFF' : '#243B53',
                },
              ]}
            >
              {dicas[dicaAtual].texto}
            </Text>

            <Text style={styles.xpLost}>⭐ XP: -10 XP</Text>

            <TouchableOpacity style={styles.nextHintButton} onPress={proximaDica}>
              <Text style={styles.nextHintText}>
                {dicaAtual < dicas.length - 1 ? 'Próxima dica' : 'Fechar dica'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {mostrarFerramentas && (
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.detetiveBox,
              { backgroundColor: dark ? '#0F172A' : '#DDF2FF' },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMostrarFerramentas(false)}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            <Text style={[styles.detetiveTitle, { color: dark ? '#FFFFFF' : '#312E81' }]}>
              Ferramentas de Detetive
            </Text>

            <View
              style={[
                styles.reportBox,
                { backgroundColor: dark ? '#1E293B' : '#F3E8FF' },
              ]}
            >
              <Text style={styles.reportTitle}>📜 Relatório de Análise</Text>

              <Text style={[styles.reportItem, { color: dark ? '#FFFFFF' : '#111827' }]}>
                🏢 Comunicação oficial:
              </Text>

              <Text style={[styles.reportText, { color: dark ? '#CBD5E1' : '#111827' }]}>
                “A mensagem orienta utilizar o sistema oficial da empresa.”
              </Text>

              <Text style={[styles.reportItem, { color: dark ? '#FFFFFF' : '#111827' }]}>
                🔒 Segurança:
              </Text>

              <Text style={[styles.reportText, { color: dark ? '#CBD5E1' : '#111827' }]}>
                “Não existe solicitação de senha nem dados pessoais.”
              </Text>

              <Text style={[styles.reportItem, { color: dark ? '#FFFFFF' : '#111827' }]}>
                📞 Confirmação:
              </Text>

              <Text style={[styles.reportText, { color: dark ? '#CBD5E1' : '#111827' }]}>
                “A mensagem incentiva contato com o setor financeiro.”
              </Text>

              <Text style={[styles.miau, { color: dark ? '#CBD5E1' : '#374151' }]}>
                🐱 Detetive Miau: Nem toda mensagem é golpe. O importante é analisar os sinais!
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 24,
  },

  retryButton: {
    backgroundColor: '#F59E0B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  topRow: {
    marginTop: 25,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  back: {
    fontSize: 32,
    color: '#22C55E',
  },

  xp: {
    backgroundColor: '#22C55E',
    color: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: 'bold',
  },

  emailHeader: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },

  emailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  small: {
    fontSize: 12,
    marginTop: 3,
  },

  subject: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },

  emailBody: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 18,
  },

  mailText: {
    fontSize: 14,
    lineHeight: 21,
  },

  ciper: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },

  redButton: {
    backgroundColor: '#FF4B4B',
    padding: 17,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },

  greenButton: {
    backgroundColor: '#22C55E',
    padding: 17,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 18,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  dicaButton: {
    alignSelf: 'center',
    marginBottom: 15,
  },

  dicaButtonText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },

  feedback: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },

  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  feedbackText: {
    marginBottom: 10,
  },

  nextButton: {
    backgroundColor: '#2E5BFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  tools: {
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  avisoBox: {
    borderWidth: 2,
    borderColor: '#7C83FF',
    padding: 18,
    borderRadius: 8,
    width: '80%',
  },

  avisoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },

  avisoText: {
    marginBottom: 6,
  },

  avisoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  cancelButton: {
    backgroundColor: '#FB7185',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },

  useButton: {
    backgroundColor: '#A78BFA',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },

  avisoButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  hintBox: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    padding: 18,
    borderRadius: 20,
    width: '85%',
  },

  hintTitle: {
    color: '#60A5FA',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  hintText: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  xpLost: {
    alignSelf: 'center',
    backgroundColor: '#FDE68A',
    color: '#92400E',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  nextHintButton: {
    backgroundColor: '#2E5BFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextHintText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  detetiveBox: {
    borderWidth: 2,
    borderColor: '#6366F1',
    borderRadius: 18,
    padding: 18,
    width: '90%',
    maxHeight: '85%',
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  closeText: {
    fontSize: 24,
    color: '#94A3B8',
  },

  detetiveTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  reportBox: {
    borderWidth: 2,
    borderColor: '#A78BFA',
    borderRadius: 18,
    padding: 18,
  },

  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 22,
  },

  reportItem: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },

  reportText: {
    marginTop: 8,
    lineHeight: 22,
  },

  miau: {
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
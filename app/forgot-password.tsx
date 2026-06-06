import { router } from 'expo-router';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ForgotPassword() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/cyber.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Esqueceu sua senha?
      </Text>

      <Text style={styles.subtitle}>
        Sem problemas, vamos te ajudar!
      </Text>

      <Text style={styles.label}>
        Qual seu e-mail de cadastro?
      </Text>

      <TextInput
        placeholder="ciper@gmail.com"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/verify-code')}
      >
        <Text style={styles.buttonText}>
          Enviar
        </Text>
      </TouchableOpacity>

      <Text style={styles.tip}>
        Dica: Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de Spam!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EEF4FF',
    padding:30,
    justifyContent:'center'
  },

  logo:{
    width:250,
    height:80,
    alignSelf:'center',
    marginBottom:20
  },

  title:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },

  subtitle:{
    textAlign:'center',
    color:'#52606D',
    marginBottom:25
  },

  label:{
    marginBottom:10,
    fontWeight:'600'
  },

  input:{
    backgroundColor:'#FFF',
    padding:16,
    borderRadius:14,
    marginBottom:20
  },

  button:{
    backgroundColor:'#2E5BFF',
    padding:16,
    borderRadius:14,
    alignItems:'center'
  },

  buttonText:{
    color:'#FFF',
    fontWeight:'bold',
    fontSize:18
  },

  tip:{
    marginTop:25,
    textAlign:'center',
    color:'#7B8794',
    fontSize:13
  }
});
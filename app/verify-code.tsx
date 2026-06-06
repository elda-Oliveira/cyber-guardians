import { router } from 'expo-router';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function VerifyCode() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/cyber.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Acabamos de enviar um código para seu e-mail
      </Text>

      <Text style={styles.subtitle}>
        Insira no campo abaixo o código de verificação de 5 dígitos.
      </Text>

      <TextInput
        placeholder="....."
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/new-password')}
      >
        <Text style={styles.buttonText}>
          Confirmar
        </Text>
      </TouchableOpacity>

      <Text style={styles.resend}>
        Reenviar código
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EEF4FF',
    justifyContent:'center',
    padding:30
  },

  logo:{
    width:250,
    height:80,
    alignSelf:'center',
    marginBottom:20
  },

  title:{
    fontSize:28,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:15
  },

  subtitle:{
    textAlign:'center',
    color:'#52606D',
    marginBottom:25
  },

  input:{
    backgroundColor:'#FFF',
    padding:18,
    borderRadius:14,
    textAlign:'center',
    fontSize:24,
    letterSpacing:10,
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

  resend:{
    textAlign:'center',
    color:'#2E5BFF',
    marginTop:20,
    fontWeight:'bold'
  }
});
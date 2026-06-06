import { router } from 'expo-router';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NewPassword() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/cyber.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Digite sua nova senha
      </Text>

      <TextInput
        placeholder="Nova senha"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirme sua nova senha"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.buttonText}>
          Enviar
        </Text>
      </TouchableOpacity>

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
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:25
  },

  input:{
    backgroundColor:'#FFF',
    padding:16,
    borderRadius:14,
    marginBottom:15
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
  }
});
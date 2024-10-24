import { StyleSheet, TextInput, Button, Pressable, TouchableOpacity} from 'react-native';
import { Text, View } from '@/src/components/Themed';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import InputComponentInicioSesion from '@/src/components/InputIniciosesion';
import SaveButton from '@/src/components/SaveButton';

//ESTA ES LA PANTALLA DEL CALENDARIO


const IniciarSesion = () =>{
  const [user, SetUser]= useState('');
  const [password, SetPassword]= useState('');
  const [errors, setErrors] = useState('');

  const router=useRouter()
  
  
  const validarInput = () => {
    setErrors('');
    if (!user) {
      setErrors('No se ha ingresado el usuario');
      return false;
    }
    if (!password) {
      setErrors('No se ha ingresado la contraseña');
      return false;
    }

    return true;
  };
  
  const olvidarContraseña= () =>{
    console.log("Enviando a la pantalla de recuperar contraseña")
  }
  const onLogin = () => {
    if (!validarInput()) {
      return;
    }
    
   
    SetUser('')
    SetPassword('')
    

    router.push('/registroProgenitor'); 

  };

  const RegistrarUsuario = () => {
    router.push('/registroUsuario')

  }

  

  return (
    <View style={styles.container}>
      
      
 
   
      <InputComponentInicioSesion label="Usuario" value={user} setFunction={SetUser} iconName="user" iconType="font-awesome"  />
      <InputComponentInicioSesion label="Contraseña" value={password} setFunction={SetPassword} iconName="eye" iconType="font-awesome" secureTextEntry />
      <TouchableOpacity onPress={olvidarContraseña}>
        <Text style={styles.forgotPasswordText}> Olvidé mi contraseña</Text>

      </TouchableOpacity>

      <Text style={styles.error}>{errors}</Text>

      <View style={styles.buttonContainer}>
        <SaveButton texto="Iniciar Sesión" onPress={onLogin}/>
      </View>
      <Text style={styles.SignUp}>No tenes una cuenta? </Text>
      <TouchableOpacity onPress={RegistrarUsuario}>
        <Text style={styles.SignUp2}> Registrate</Text>
      </TouchableOpacity>


      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#a9bb7c", 
    flex:1, 
    justifyContent: "center", 
    alignContent:"center", 
    paddingTop: 50, 
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#a9bb7c", 
    marginBottom:20, 
    marginTop:30
  },
  forgotPasswordText: {
    color: '#FFFFFF', // Color azul para el texto clickeable
    textAlign:"left",
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight:"bold" // Subrayar el texto para indicar que es clickeable
  },
  SignUp:{
    marginVertical: 1,      // Espaciado vertical
    fontSize: 14,
    color: "black", 
    fontWeight:"bold", 
    textAlign:"center"
  }, 
  SignUp2:{
    marginVertical: 1,      // Espaciado vertical
    fontSize: 14,
    color: "black", 
    fontWeight:"bold", 
    textAlign:"center", 
    textDecorationLine:"underline"

  }
});

export default IniciarSesion;
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from '../../components/customButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { Auth } from 'aws-amplify';

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password')
    const navigation = useNavigation();

    const onRegisterPressed = async(data) => {
      const {username, password, email, name} = data;
      try{
          await Auth.signUp({
            username,
            password,
            attributes: {email, name, preferred_username: username},
          });
          navigation.navigate('ConfirmEmail', {username})
        }catch(e){
          Alert.alert("Oops", e.message)
        }
        
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn')
    }
    
    return (
    <ScrollView>
    <View style= {styles.root}>
      <Text style={styles.title}>Crea una cuenta</Text>

      <CustomInput name="name" placeholder="Nombre" control={control} rules={{required: 'El nombre es requerido', minLength: {value: 3, message: 'El nombre de usuario debe tener al menos 3 caracteres'}, maxLength:{value: 10, message: 'El nombre de usuario debe tener como maximo 10 caracteres'}}}/>

      <CustomInput name="username" placeholder="Usuario" control={control} rules={{required: 'El nombre de usuario es requerido', minLength: {value: 3, message: 'El nombre de usuario debe tener al menos 3 caracteres'}, maxLength:{value: 10, message: 'El nombre de usuario debe tener como maximo 10 caracteres'}}}/>

      <CustomInput name = "email" placeholder="Email" control={control}/>

      <CustomInput name= "password"placeholder="Contraseña" control={control} secureTextEntry rules={{required: 'La contraseña es requerida', minLength: {value: 3, message: 'El nombre de usuario debe tener al menos 8 caracteres'}, maxLength:{value: 15, message: 'La contraseña debe tener como maximo 15 caracteres'}}}/>

      <CustomInput name="rePassword" placeholder="Repite la Contraseña" control={control} secureTextEntry rules={{
        validate: value => value=== pwd|| 'Contraseña incorrecta',
      }}/>

      <CustomButton  text="Registrar" onPress={handleSubmit(onRegisterPressed)}/>
      <CustomButton  text="Ya tienes una cuenta? Ingresa aquí" onPress={onSignInPress} type ='TERTIARY'/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
    root: {
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10
    },
})

export default SignUpScreen;

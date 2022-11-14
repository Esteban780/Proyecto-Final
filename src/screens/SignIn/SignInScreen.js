import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/imagenes/unnamed.png';
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from '../../components/customButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { Auth } from 'aws-amplify';

const SignInScreen = () => {
    
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm();

    const onSignInPressed = async(data) => {
        if(loading){
            return;
        }

        setLoading(true);
        try{
            const response = await Auth.signIn(data.username, data.password);
            navigation.navigate('Home');
        }catch (e){
            Alert.alert('Oops', e.message)
        }
        setLoading(false);
        
    }
    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");

        navigation.navigate('ForgotPassword')
    }
    const onSignUpPressed = () => {
        console.warn("SignUp");

        navigation.navigate('SignUp')
    }
 
    return (
    <ScrollView>
    <View style= {styles.root}>
      <Image source={Logo} 
      style={[styles.logo, {height: height * 0.3}]} 
      resizeMode='contain' 
      />

      <CustomInput name= 'username' placeholder="Usuario" control ={control} rules={{required: 'El nombre de usuario es requerido'}}/>
      <CustomInput name= 'password' placeholder="Contraseña"  secureTextEntry control={control} rules={{required: "La contraseña es requerida", minLength: {value:8, message: 'La contrasena debe tener minimo 8 caracteres'}}}/>
      
    
      <CustomButton  text={loading ? 'Cargando...' : "Ingresando"} onPress={handleSubmit(onSignInPressed)}/>
      <CustomButton  text="Recuperar Contraseña" onPress={onForgotPasswordPressed} type ='TERTIARY'/>
      <CustomButton  text="Crea una cuenta" onPress={onSignUpPressed} type ='TERTIARY'/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '70%',
        maxHeight: 200,
        maxWidth: 100,


    },
})

export default SignInScreen;


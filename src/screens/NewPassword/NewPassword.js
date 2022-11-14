import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from '../../components/customButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { Auth } from 'aws-amplify';

const NewPassword = () => {

    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();
   
    const onSubmitPressed = async (data) => {
        try{
            const response = await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn')
        }catch (e){
            Alert.alert('Oops', e.message)
        }
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }
 
    return (
    <ScrollView>
    <View style= {styles.root}>
      <Text style={styles.title}>Nueva contraseña</Text>

      <CustomInput name = "Username" placeholder="Usuario" control={control} rules={{required: 'El codigo es requerido'}}/>

      <CustomInput name = "code" placeholder="Ingresa tu Codigo" control={control} rules={{required: 'El codigo es requerido'}}/>
      <CustomInput name = "password" placeholder="Ingresa la nueva contrasena" control ={control} secureTextEntry rules={{required: "Ingrese la contrasena", minLength: {value: 8, message: 'La contrasena no tiene 8 caracteres'}}}/>
      

      <CustomButton  text="Cambiar contrasena" onPress={handleSubmit(onSubmitPressed)}/>
      <CustomButton  text="Volver" onPress={onSignInPress} type ='TERTIARY'/>
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

export default NewPassword;
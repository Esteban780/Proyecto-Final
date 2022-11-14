import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from '../../components/customButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';


const ConfirmEmailScreen = () => {

    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

    const onSendPressed = async data => {
        try{
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword')
        }catch (e){
            Alert.alert('Oops', e.message)
        }
        
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn')
    }
    
 
    return (
    <ScrollView>
    <View style= {styles.root}>
      <Text style={styles.title}>Resetea tu contraseña</Text>

      <CustomInput name = "username" placeholder="Nombre de Usuario" control={control} rules={{required: "El nombre de usuario es requerido"}}/>

      <CustomButton  text="Enviar" onPress={handleSubmit(onSendPressed)}/>
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

export default ConfirmEmailScreen;
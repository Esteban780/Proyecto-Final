import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from '../../components/customButton/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import {Auth} from 'aws-amplify'

const ConfirmEmailScreen = () => {
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({defaultValues: {username: route?.params?.username}});

    const username = watch('username');

    const navigation = useNavigation()

    const onConfirmPressed = async data => {
        try{
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn');
        }catch (e){
            Alert.alert("Oops", e.message);
        }
        
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }
    const onResendPress = async() => {
        try{
            await Auth.resendSignUp(username);
            Alert.alert('El codigo se envio nuevamente')
        }catch (e){
            Alert.alert("Oops", e.message);
        }
    }
 
    return (
    <ScrollView>
    <View style= {styles.root}>
      <Text style={styles.title}>Confima tu cuenta</Text>

      <CustomInput name = 'username' placeholder="Usuario" control={control} rules={{required: 'Ingrese un codigo'}}/>

      <CustomInput name = 'code' placeholder="Codigo" control={control} rules={{required: 'Ingrese un codigo'}}/>

      <CustomButton  text="Ingresar Codigo" onPress={handleSubmit(onConfirmPressed)}/>
      <CustomButton  text="Reenviar Codigo" onPress={onResendPress} type = 'SECONDARY'/>
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
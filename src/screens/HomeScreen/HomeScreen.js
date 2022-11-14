<<<<<<< HEAD
import { View, Text, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('screen');

const HomeScreen = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([])


  useEffect(() =>{
    getMyLocation()
  },[])

  

  function getMyLocation(){
    Geolocation.getCurrentPosition(info => {
      console.log("LAT ", info.coords.latitude)
      console.log("Long", info.coords.longitude)


    setRegion({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })



    },
    () => {console.log("DIO UN ERROR")}, {
      enableHighAcurrancy: true,
      timeout: 2000,
    })
  }

  function newMarker(e){
    //console.log(e.nativeEvent.coordinate.latitude)
    let dados ={
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      },
      pinColor: '#FF0000'
    }

    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

    setMarkers(oldArray => [...oldArray, dados] )
  }
  return (
    <View style={{flex: 1}}>
      <MapView
        onMapReady={() => {
          Platform.OS === 'android' ? PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(()=>{
              console.log("Usuario Aceptado")
            })
            : ''
        }}
        style={{width:width, height:height}}
        region={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={(e) => newMarker(e)}
        >
          {markers.map(marker => {
            return(
              <Marker key={marker.key} coordinate={marker.coords} pinColor={marker.pinColor}/>
            )
          })}
  </MapView>
      
    </View>
  )
=======
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

export default function MapsScreen(){
    return(
      <View style = {styles.container}>
        <MapView
          style={styles.map}
        />
      </View>
    );
>>>>>>> 408626693056213ed887536a062604ce7b3240f4
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map:{
    width: '100%',
    height: '100%'
  }
})
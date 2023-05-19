import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";
import { ActivityIndicator } from 'react-native';
import MapView, {Marker} from 'react-native-maps';


export default function MapScreen({ route }) {
  const [yourPosicion, setPosicion] = useState(null)
  const data = route.params
  useEffect(() => {
    (async () => {
      let pos = await Location.getCurrentPositionAsync({})
      setPosicion(pos)
    })()

  }, [])

  return (
    <View style={{flex:1}}>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: data[0].coords.latitude,
            longitude: data[0].coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          {data.map((el, index)=>{
            if(el.switchValue == true){
              return<Marker
              key={index}
              coordinate={{
                latitude: el.coords.latitude,
                longitude: el.coords.longitude

              }}
              title={"marker"}
              des={"descryption"}
            ></Marker>
            }
            
          })}
        </MapView>
    </View>
  )
}

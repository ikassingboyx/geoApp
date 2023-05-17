import { View, Text, StyleSheet, Image, Switch} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react'

export default function ListItem({data, switchValue, onSwitchToggle }) {
  return (
    <View style={styles.container}>
        <View style={styles.display}>
            <View >
                <Image style={styles.border} source={require("../assets/icon.png")} >
                </Image >
            </View>
            <View>
                <Text style={styles.text}>timestamp: {data.timestamp}</Text>
                <Text>latitude: {data.coords.latitude}</Text>
                <Text>longitude: {data.coords.longitude}</Text>

            </View>
            <Switch value={switchValue} onValueChange={onSwitchToggle} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    border:{
        borderWidth: 5,
        height:70,
        width: 70,
        margin: 20,
        borderRadius: 70/2
    },
    text:{
        color: "#70aaff",
        fontSize: 17
    },
    container:{
      padding: 10,
      margin: 15,
      flex: 1,
      borderRadius: 20,
      width: 360,
      textAlign: "center"
    },
    display:{
        display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    buttons: {
      display: "flex",
      flexDirection: "row"
    },
  });
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Font from "expo-font";
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font/build/FontHooks';
export default function Main({ navigation }) {
    const [fontsLoaded] = useFonts({
        'myfonttwo': require('../assets/fonts/Ysabeau-VariableFont_wght.ttf'), 
        'myfontone': require('../assets/fonts/Ysabeau-Italic-VariableFont_wght.ttf'),
    });

    return (
        <View style={styles.container}>
            {
                fontsLoaded ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { navigation.navigate("List") }}>
                            <Text style={{ fontFamily: "myfontone", fontWeight: 200, fontSize: 50, margin: 30 }}>GeoApp</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "myfonttwo", fontWeight: 100, fontSize: 20, textAlign: 'center' }}> Find and save your posicion {"\n"} using google maps</Text>
                    </View>

                    : <ActivityIndicator size="large" color="#0000ff" />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#47aaff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

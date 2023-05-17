import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function MyButton({ color, text, props, pressFunction }) {
  return (
    <View style={[{ backgroundColor: color }, styles.button]} >
      <TouchableOpacity onPress={pressFunction} style={{ flex: 1 }}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )

}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 12,
    marginRight: 60,
    marginLeft: 60,
    margin: 10,
    height: 40,
  },
  text: {
    flex: 1,
    color: "black",
    textAlign: "center"
  }
})
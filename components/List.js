import { View, Text, Switch, StyleSheet, Alert, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location"; 
import React from 'react'
import MyButton from './MyButton'
import ListItem from './ListItem';

export default function List({ navigation }) {
    const [timestamps, setTimestapms] = useState([])
    const [masterSwitchValue, setMasterSwitchValue] = useState(false);
    const [stateId, setId] = useState(0);
    const STORAGE_KEY = '@MyApp:timestamps';
    useEffect(() => {
        Location.requestForegroundPermissionsAsync();
        loadData();
      }, []);
    
      useEffect(() => {
        saveData();
        const data = timestamps
      }, [timestamps]);
    useEffect(() => {
        const updatedData = timestamps.map((item) => ({ ...item, switchValue: masterSwitchValue }));
        setTimestapms(updatedData);
      }, [masterSwitchValue]);
      const loadData = async () => {
        try {
          const storeData = await AsyncStorage.getItem(STORAGE_KEY);
          if (storeData) {
            setTimestapms(JSON.parse(storeData));
          }
        } catch (error) {
          console.log('Błąd podczas odczytu danych:', error);
        }
      };
    
      const saveData = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
        } catch (error) {
          console.log('Błąd podczas zapisywania danych:', error);
        }
      };
      const deleteSelectedItems = () => {
        Alert.alert(
          'Potwierdzenie',
          'Czy na pewno chcesz usunąć?',
          [
            {
              text: 'Nie',
              onPress: () => console.log('Wybrano "Nie"'),
              style: 'cancel',
            },
            {
              text: 'Tak',
              onPress: async () => {
                const updatedData = timestamps.filter((item) => !item.switchValue);
                setTimestapms(updatedData);
              },
            },
          ],
          { cancelable: false }
        )
      };
    
      const toggleMasterSwitch = () => {
        setMasterSwitchValue(!masterSwitchValue);
      };


      const toggleItemSwitch = (itemId) => {
        const updatedData = timestamps.map((item) =>
          item.id === itemId ? { ...item, switchValue: !item.switchValue } : item
        );
        setTimestapms(updatedData);
      };
    const addPosicion = async() => {
        Alert.alert(
            'Potwierdzenie',
            'Czy na pewno chcesz zapisać pozycjeć?',
            [
              {
                text: 'Nie',
                onPress: () => console.log('Wybrano "Nie"'),
                style: 'cancel',
              },
              {
                text: 'Tak',
                onPress: async () => {
                    let pos = await Location.getCurrentPositionAsync({})
                    setTimestapms(current => [...current, {...pos, switchValue: false,  id: stateId+1 }  ]);
                    setId(stateId+1)
                    storeData(timestamps)
                },
              },
            ],
            { cancelable: false }
          );
          }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <View style={styles.con}>
                <MyButton color={"#47aaff"} text={"POBIERZ I ZAPISZ POZYCJĘ"} pressFunction={addPosicion}></MyButton>
                <MyButton color={"#47aaff"} text={"USUŃ WSZYSTKIE POZYCJE"} pressFunction={deleteSelectedItems} ></MyButton>
            </View>
            <View style={styles.con}>
                <MyButton color={"#47aaff"} text={"PRZEJDZ DO MAPY"} pressFunction={() => { 
                  navigation.navigate("MapScreen", timestamps) }}></MyButton>
                <Switch value={masterSwitchValue} onValueChange={toggleMasterSwitch} />
            </View>
            <View style={styles.list}>
                <FlatList
                    data={timestamps}
                    renderItem={({ item }) => <ListItem switchValue={item.switchValue} onSwitchToggle={() => toggleItemSwitch(item.id)} data={item}></ListItem>}
                    keyExtractor={(item) => item.id.toString()}
                    >
                </FlatList>

            </View>
        </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    con: {
      display: 'flex',
      justifyContent: 'center',
    },
    list: {
      flex: 1,
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
    },
  });

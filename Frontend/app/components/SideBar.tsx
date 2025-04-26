import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function SideBar() {

  const [isSideBar, setIsSideBar] = useState(false);

  return (
    <View style={styles.container}>
      
      {!isSideBar && (
        <View style={styles.menuButton}>
          <Octicons name="three-bars" size={24} color="#000" onPress={() => setIsSideBar(true)} />

          <Image source={require("../../assets/images/Logo.jpg")} style={styles.logo} />
        </View>
      )}

      {isSideBar && (
        <View style={styles.menu}>
          <View style = {styles.menuItem}>
            <TouchableOpacity onPress={() => setIsSideBar(false)}>
              <Image source={require("../../assets/images/Logo.jpg")} style={styles.logoLarge} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSideBar(false)}>
                <Entypo name="circle-with-cross" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  },
  menu: {
    position: "relative",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "70%",
    height: "100%",
    backgroundColor: "#9adab9",
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 16
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: "space-between"
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 50
  },
  logoLarge: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
})
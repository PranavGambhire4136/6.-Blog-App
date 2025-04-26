import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function SideBar() {

    const [isSideBar, setIsSideBar] = useState(false);

  return (
    <View>
      
      {!isSideBar && (
        <View style={{position: "relative", top: 0, left: 0, zIndex: 1, padding: 20, flexDirection: "row", justifyContent: "space-between"}}>
          <Octicons name="three-bars" size={24} color="black" onPress={() => setIsSideBar(true)} />

            <Image source={require("../../assets/images/Logo.jpg")} style={{width: 24, height: 24, borderRadius: 50}} />
        </View>
      )}

      {isSideBar && (
        <View style={{position: "relative", top: 0, left: 0, zIndex: 1, width: "70%", height: "100%", backgroundColor: "#9adab9"}}>
          <View style = {{flex: 1, flexDirection: "row", height: "50", justifyContent: "space-between", padding: 10}}>
            <TouchableOpacity onPress={() => setIsSideBar(false)}>
              <Image source={require("../../assets/images/Logo.jpg")} style={{width: 50, height: 50, borderRadius: 50}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSideBar(false)}>
                <Entypo name="circle-with-cross" size={20} color="red" />
            </TouchableOpacity>
          </View>


          <View>
            
          </View>
          
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})
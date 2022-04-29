import { StyleSheet, TextInput,Text, View, Button,FlatList, SafeAreaView, StatusBar} from 'react-native';
import React, { useState } from "react";
import DashboardButton from '../../components/DashboardButton';
import { AppStyles } from '../../utils/styles';
import { db, authentication } from '../../firebase/firebase-config';
import { BottomNavigation } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';


export default function RiderDashboard({ navigation }) {
  function logoutHandler() {
    console.log("User Logged Out");
    authentication.signOut();
  }

  function PressHandlerDashboard(title){
    switch(title){
      case 'A':
        console.log("a");
        //navigation.navigate()
        break;
      case 'B':
        console.log("b");
        //navigation.navigate()
        break;
      case 'C':
        console.log("c");
        //navigation.navigate()
        break;
      case 'D':
        console.log("d");
        //navigation.navigate()
        break;
      default:
          console.log("something went wrong");
    }
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'A',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'B',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'C',
    },
    {
      id: '1234123047',
      title: 'D',
    },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <DashboardButton
        title={title} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={() =>PressHandlerDashboard(title)}
      />
    </View>
  );
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
  
    return (
      
      <SafeAreaView style={styles.container}>
        <Text style = {styles.text}>Welcome Driver! This is Driver Dashboard</Text>
        <Text style = {styles.text}>Maybe we can make this your profile or friend activity?
        make profile button an edit profile button? Or we can put your current location on this screen?</Text>
        <CustomButton 
            title='Log out' 
            color={AppStyles.color.mint} 
            textColor={AppStyles.color.white} 
            onPress={logoutHandler}/>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          scrollEnabled={isScrollEnabled}
        />
      </SafeAreaView>
    );
  }
  


const styles = StyleSheet.create({
    containerMe: {
      flex: 1,
      backgroundColor: AppStyles.color.black,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: AppStyles.color.white,
    },
    container: {
      flex: 1,
      marginBottom:0,
      backgroundColor: AppStyles.color.black,
      
      
    },
    item: {
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
      padding: 8,
      marginVertical: 8,
      marginHorizontal: 5,
    },
    title: {
      fontSize: 32,
    },
});

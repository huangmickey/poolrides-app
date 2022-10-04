// SearchBar.js
import React from "react";
import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import Button from 'react-native-button';
import { Feather, Entypo } from "@expo/vector-icons";

import { AppStyles } from "../utils/styles";

function SearchBar({isClicked, searchPhrase, setSearchPhrase, setIsClicked}) {
  return (
    <View style={styles.container}>
      <View
        style={
          isClicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={AppStyles.color.black}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setIsClicked(true);
          }}
          onBlur={() => {
            setIsClicked(false);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {isClicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { 
            setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {isClicked && (
        <View>
          <Button
            style={styles.cancelBtn}
            onPress={() => {
              Keyboard.dismiss();
              setIsClicked(false);
            }}
          >  Cancel</Button>
        </View>
      )}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  cancelBtn: {
    color: AppStyles.color.salmonred,
    fontSize: 18,
  },
});
export default SearchBar;
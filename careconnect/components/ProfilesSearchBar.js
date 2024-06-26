import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "react-native-ui-lib";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { allLocations, allNationalities, allPositions } from "../utils/allOptions";

export const MultipleFilters = () => {
  const [locationState, setLocationState] = useState({
    itemsCount: 1,
    location: undefined,
    option: undefined,
    nativePickerValue: "",
    pickerOpen: false,
  });

  const [nationalityState, setNationalityState] = useState({
    itemsCount: 1,
    nationality: undefined,
    option: undefined,
    nativePickerValue: "",
    pickerOpen: false,
  });

  const [positionState, setPositionState] = useState({
    itemsCount: 1,
    position: undefined,
    option: undefined,
    nativePickerValue: "",
    pickerOpen: false,
  });

  return (
    <ScrollView scrollEnabled={false}>
      <View style={styles.searchBarContainer}>
        <Picker
          placeholder="Location"
          placeholderTextColor="#000"
          useWheelPicker
          enableModalBlur={false}
          value={locationState.nativePickerValue}
          onChange={nativePickerValue =>
            setLocationState(prevState => ({ ...prevState, nativePickerValue }))
          }
          trailingAccessory={
            <Entypo
              name={locationState.pickerOpen ? "chevron-up" : "chevron-down"}
              size={22}
              color="black"
            />
          }
          onPress={() =>
            setLocationState(prevState => ({ ...prevState, pickerOpen: !prevState.pickerOpen }))
          }
          topBarProps={{
            doneLabel: "Done",
            cancelLabel: "Cancel",
          }}
          fieldType="filter"
        >
          {allLocations.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              style={{
                color: option.value === locationState.nativePickerValue ? "#ff0000" : "#000000",
              }}
            />
          ))}
        </Picker>
        <Picker
          placeholder="Nationality"
          placeholderTextColor="#000"
          useWheelPicker
          enableModalBlur={false}
          value={nationalityState.nativePickerValue}
          onChange={nativePickerValue =>
            setNationalityState(prevState => ({ ...prevState, nativePickerValue }))
          }
          trailingAccessory={
            <Entypo
              name={nationalityState.pickerOpen ? "chevron-up" : "chevron-down"}
              size={22}
              color="black"
            />
          }
          onPress={() =>
            setNationalityState(prevState => ({ ...prevState, pickerOpen: !prevState.pickerOpen }))
          }
          topBarProps={{
            doneLabel: "Done",
            cancelLabel: "Cancel",
          }}
          fieldType="filter"
        >
          {allNationalities.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              style={{
                color: option.value === nationalityState.nativePickerValue ? "#ff0000" : "#000000",
              }}
            />
          ))}
        </Picker>
        <Picker
          placeholder="Position"
          placeholderTextColor="#000"
          useWheelPicker
          enableModalBlur={false}
          value={positionState.nativePickerValue}
          onChange={nativePickerValue =>
            setPositionState(prevState => ({ ...prevState, nativePickerValue }))
          }
          trailingAccessory={
            <Entypo
              name={positionState.pickerOpen ? "chevron-up" : "chevron-down"}
              size={22}
              color="black"
            />
          }
          onPress={() =>
            setPositionState(prevState => ({ ...prevState, pickerOpen: !prevState.pickerOpen }))
          }
          topBarProps={{
            doneLabel: "Done",
            cancelLabel: "Cancel",
          }}
          fieldType="filter"
        >
          {allPositions.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              style={{
                color: option.value === positionState.nativePickerValue ? "#ff0000" : "#000000",
              }}
            />
          ))}
        </Picker>
        <Ionicons
          name="search-circle"
          size={38}
          color="#FA89B8"
          style={{ marginHorizontal: -10 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    height: 55,
    width: 370,
    top: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#FA89B8",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    placeholder: {
      color: "lightgray",
      fontSize: 14,
    },
  },
});

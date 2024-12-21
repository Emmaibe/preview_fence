import {Image, Text, StyleSheet, TouchableOpacity, View, Switch} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';

const General = () => {
    const router = useRouter();

    const [notification, setNotification] = useState(false);
    const [open, setOpen] = useState(false);
    const [openUnit, setOpenUnit] = useState(false);
    const [value, setValue] = useState(null);
    const [valueUnit, setValueUnit] = useState(null);
    const [items, setItems] = useState([
        { label: 'English (UK)', value: 'english_uk' },
        { label: 'English (US)', value: 'english_us' },
        { label: 'Mandarin Chinese (China, Singapore, Malaysia, Taiwan)', value: 'mandarin_chinese' },
        { label: 'Hindi (India, Nepal)', value: 'hindi' },
        { label: 'Spanish (Spain, Latin America, United States)', value: 'spanish' },
        { label: 'French (France, Canada, West Africa, Belgium, Switzerland)', value: 'french' },
        { label: 'Arabic (Middle East, North Africa)', value: 'arabic' },
        { label: 'Bengali (Bangladesh, India)', value: 'bengali' },
        { label: 'Portuguese (Brazil, Portugal, Angola, Mozambique)', value: 'portuguese' },
        { label: 'Russian (Russia, Eastern Europe, Central Asia)', value: 'russian' },
        { label: 'Urdu (Pakistan, India)', value: 'urdu' },
    ]);

    const [itemsUnit, setItemsUnit] = useState([
        { label: 'Length: metric (meters, centimeters)', value: 'length_metric' },
        { label: 'Length: imperial (inches, feet)', value: 'length_imperial' },
        { label: 'Mass: metric (grams, kilograms)', value: 'mass_metric' },
        { label: 'Mass: imperial (pounds, ounces)', value: 'mass_imperial' },
        { label: 'Volume: metric (liters, milliliters)', value: 'volume_metric' },
        { label: 'Volume: imperial (gallons, quarts, pints, fluid ounces)', value: 'volume_imperial' },
        { label: 'Temperature: Celsius', value: 'temperature_celsius' },
        { label: 'Temperature: Fahrenheit', value: 'temperature_fahrenheit' },
        { label: 'Temperature: Kelvin', value: 'temperature_kelvin' },
        { label: 'Time: seconds, minutes, hours, days', value: 'time' },
        { label: 'Area: metric (square meters, square centimeters)', value: 'area_metric' },
        { label: 'Area: imperial (square feet, acres)', value: 'area_imperial' },
        { label: 'Speed: metric (meters per second, kilometers per hour)', value: 'speed_metric' },
        { label: 'Speed: imperial (miles per hour)', value: 'speed_imperial' },
        { label: 'Pressure: metric (pascals, kilopascals)', value: 'pressure_metric' },
        { label: 'Pressure: imperial (pounds per square inch)', value: 'pressure_imperial' },
        { label: 'Energy: metric (joules, kilojoules)', value: 'energy_metric' },
        { label: 'Energy: imperial (British thermal units, calories)', value: 'energy_imperial' },
        { label: 'Power: metric (watts, kilowatts)', value: 'power_metric' },
        { label: 'Power: imperial (horsepower)', value: 'power_imperial' },
    ]);

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Settings</Text>
            </TouchableOpacity>

            <View className="mt-10 space-y-4">
                <View className="z-50">
                    <Text className="text-[14px] font-intermedium text-primary-text">Select language</Text>

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select an option..."
                        className="mt-2 font-intermedium text-primary-text p-4 rounded-[12px] w-full border border-primary-gray-light"
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                </View>

                <View className="z-40">
                    <Text className="text-[14px] font-intermedium text-primary-text">Unit of measurement</Text>
                    <Text className="font-intermedium text-[14px] text-gray-200 my-1">
                        choose between metric (meters, centimeters) and imperial (feet, inches) units for fence measurements.
                    </Text>

                    <DropDownPicker
                        open={openUnit}
                        value={valueUnit}
                        items={itemsUnit}
                        setOpen={setOpenUnit}
                        setValue={setValueUnit}
                        setItems={setItemsUnit}
                        placeholder="Select an option..."
                        className="mt-2 font-intermedium text-primary-text p-4 rounded-[12px] w-full border border-primary-gray-light"
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                </View>

                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-[14px] font-intermedium text-primary-text">Receive notifications</Text>
                        <Text className="font-intermedium text-[14px] text-gray-200 my-1 max-w-[300]">
                            Turn on/off notifications, such as updates or new releases.
                        </Text>
                    </View>
                    <View>
                        <Switch
                            trackColor={{ false: "#ABADAC", true: "#90CBF9" }}
                            thumbColor={notification ? "#2C98F0" : "#818483"}
                            onValueChange={() => setNotification((previousState) => !previousState)}
                            value={notification}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default General;

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        marginTop: 5,
        zIndex: 100,
    },
});

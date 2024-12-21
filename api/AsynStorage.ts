import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (key: any, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error("Error saving to AsyncStorage:", e);
    }
}

export const saveObjectToAsyncStorage = async (key: any, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("Error saving object to AsyncStorage:", e);
    }
}

export const getFromAsyncStorage = async (key: any) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error("Error getting from AsyncStorage:", e);
    }
}

export const getObjectFromAsyncStorage = async (key: any) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error getting object from AsyncStorage:", e);
    }
}

export const getAllKeysFromAsyncStorage = async () => {
    try {
        return (await AsyncStorage.getAllKeys()).filter(key => key.includes("pf_fence"));
    } catch (e) {
        console.error("Error getting all keys from AsyncStorage:", e);
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('AsyncStorage successfully cleared!');
    } catch (error) {
        console.log('Error clearing AsyncStorage:', error);
    }
}

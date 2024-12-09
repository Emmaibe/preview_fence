import * as SecureStore from 'expo-secure-store';

export const saveToSecureStorage = async (key: any, value: any) => {
    await SecureStore.setItemAsync(key, value);
}

export const getFromSecureStorage = async (key: any) => {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
        return result;
    } else {
        return null;
    }
}

export const deleteFromSecureStorage = async (key: any) => {
    await SecureStore.deleteItemAsync(key);
}

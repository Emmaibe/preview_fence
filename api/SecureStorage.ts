import * as SecureStore from 'expo-secure-store';

export const saveToSecureStorage = async (key: any, value: any) => {
    await SecureStore.setItemAsync(key, value);
}

export const getFromSecureStorage = async (key: any) => {
    return await SecureStore.getItemAsync(key);
}

export const deleteFromSecureStorage = async (key: any) => {
    await SecureStore.deleteItemAsync(key);
}

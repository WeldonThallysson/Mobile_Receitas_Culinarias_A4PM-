import AsyncStorage from '@react-native-async-storage/async-storage';
const AUTH_TOKEN_KEY = '@app:token';

export const saveToken = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(
    AUTH_TOKEN_KEY,
  );
};
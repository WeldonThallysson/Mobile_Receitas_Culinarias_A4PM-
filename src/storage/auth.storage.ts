import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@app:auth';
interface IAuthData {
  userId: number;
  token: string;
  message: string;
}

export const saveAuth = async (data: IAuthData): Promise<void> => {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = async (): Promise<IAuthData | null> => {
  try {
    const stored = await AsyncStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Erro ao recuperar autenticação:', error);
    return null;
  }
};

export const removeAuth = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_KEY);
};
import AsyncStorage from '@react-native-async-storage/async-storage';

const setItemAsync = async (key, value) => {
  try {
    const data = JSON.stringify(value) ;
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    throw error;
  }
};

const getItemAsync = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
      throw error;
  }
};


export { setItemAsync, getItemAsync };

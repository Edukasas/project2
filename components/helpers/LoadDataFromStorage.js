import AsyncStorage from '@react-native-async-storage/async-storage'; 
const loadCategories = async (setCategories, setLoading, setError) => {
  try {
    // Load category from AsyncStorage
    const storedCategories = await AsyncStorage.getItem('categories');
    const parsedCategory = storedCategories ? JSON.parse(storedCategories) : [];
    setCategories(parsedCategory);
  } catch (categoryError) {
    setError(categoryError.message || 'Error fetching category');
  } finally {
    setLoading(false);
  }
};
export {loadCategories};
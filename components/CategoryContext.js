// CategoryContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  customCategoryName: '',
  selectedApps: [],
  usageTime: 0,
  blockedTime: 0,
};

const CategoryContext = createContext();

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOM_CATEGORY_NAME':
      return {
        ...state,
        customCategoryName: action.payload,
      };
    case 'SET_SELECTED_APPS':
      return {
        ...state,
        selectedApps: action.payload,
      };
    case 'USAGE_TIME':
      return {
        ...state,
        usageTime: action.payload,
      };
    case 'BLOCKED_TIME':
      return {
        ...state,
        blockedTime: action.payload,
      };
      case 'HYDRATE_STATE':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
  }
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('categoryState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          dispatch({ type: 'HYDRATE_STATE', payload: parsedState });
        }
      } catch (error) {
        console.error('Error loading state from AsyncStorage:', error);
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('categoryState', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving state to AsyncStorage:', error);
      }
    };

    saveState();
  }, [state]);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};

// CategoryContext.js
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  customCategoryName: '',
  selectedApps: [],
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
  }
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

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

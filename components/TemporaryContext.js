import React, { createContext, useReducer, useContext } from 'react';

const TemporaryContext = createContext();

const temporaryInitialState = {
    customCategoryName: '',
    selectedApps: [],
    usageTime: 0,
    blockedTime: 0,
};

const temporaryReducer = (state, action) => {
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
        case 'RESET_TEMPORARY_DATA':
            return temporaryInitialState;
    default:
      return state;
  }
};
console.log(TemporaryContext);
export const TemporaryProvider = ({ children }) => {
  const [temporaryState, temporaryDispatch] = useReducer(
    temporaryReducer,
    temporaryInitialState
  );

  return (
    <TemporaryContext.Provider value={{ temporaryState, temporaryDispatch }}>
      {children}
    </TemporaryContext.Provider>
  );
};

export const useTemporaryContext = () => {
  const context = useContext(TemporaryContext);
  if (!context) {
    throw new Error('useTemporaryContext must be used within a TemporaryProvider');
  }
  return context;
};

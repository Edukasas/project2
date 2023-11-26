import React from 'react-native';
import { useState } from 'react';
import { View } from 'react-native';
import AddAppsForm from './FormComponents/AddAppsForm';
import TimeForm from './FormComponents/TimeForm';
import { TemporaryProvider } from '../../TemporaryContext';

const AddCategory = ({ update, onCancel }) => {

  const [showTimeForm, setShowTimeForm] = useState(false);
  const handleAddAppsSubmit = () => {
    setShowTimeForm(true);
  };
  const handleReturn = () => {
    setShowTimeForm(false);
  };
  return (
      <TemporaryProvider>
    <View>
      {showTimeForm ?
       <TimeForm update={update} returnToApps={handleReturn} /> : <AddAppsForm onSubmit={handleAddAppsSubmit} onCancel={onCancel} /> }
    </View>
    </TemporaryProvider>
  );
};

export default AddCategory;

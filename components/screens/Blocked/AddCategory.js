import React from 'react-native';
import { useState } from 'react';
import { View } from 'react-native';
import AddAppsForm from './FormComponents/AddAppsForm';
import TimeForm from './FormComponents/TimeForm';

const AddCategory = ({ refresh }) => {
  const [showTimeForm, setShowTimeForm] = useState(false);
  const handleAddAppsSubmit = () => {
    setShowTimeForm(true);
  };
  return (
    <View>
      {showTimeForm ?
       <TimeForm refresh={refresh} /> : <AddAppsForm onSubmit={handleAddAppsSubmit} refresh={refresh} /> }

    </View>
  );
};

export default AddCategory;

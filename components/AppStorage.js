import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { InstalledApps } from 'react-native-launcher-kit';

const AppList = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstalledApps = async () => {
      try {
        const apps = await InstalledApps.getApps();
        setInstalledApps(apps);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching installed apps:', error);
        setError(error.message || 'Error fetching apps');
        setLoading(false);
      }
    };

    // Fetch installed apps when the component mounts
    fetchInstalledApps();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text>List of Installed Apps:</Text>
      {installedApps.map((app, idx) => (
        <View key={idx}>
          <Image
            source={{ uri: 'data:image/png;base64,' + app.icon }}
            style={{ width:50, height: 50 }}
          />
          <Text style={{color: 'black',}}>{idx}</Text>
        </View>
      ))}
    </View>
  );
};

export default AppList;

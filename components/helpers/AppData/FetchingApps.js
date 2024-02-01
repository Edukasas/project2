import { InstalledApps } from 'react-native-launcher-kit';

const fetchInstalledApps = async (setInstalledApps, setLoading, setError) => {
  try {
    const apps = InstalledApps.getApps();
    setInstalledApps(apps);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching installed apps:', error);
    setError(error.message || 'Error fetching apps');
    setLoading(false);
  }
};
export {fetchInstalledApps};
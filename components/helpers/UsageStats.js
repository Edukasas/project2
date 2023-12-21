import { NativeModules } from 'react-native';
import { useState } from 'react';
function getUsageStats(startTime, endTime) {
    const {UsageStatsModule} = NativeModules;
    [appUsages, setAppUsages] = useState([]);
    UsageStatsModule.getStats(startTime, endTime, stats => {
      const appUsage = [];
      let apps = stats.split(',');
      apps.map(app => {
        let appStats = app.split(':');
        if (appStats[1] > 0) {
          appUsage.push({
            app: appStats[0],
            time: Number(appStats[1])/1000
          })
        }
      })
      setAppUsages(appUsage)
    })
  
    return appUsages;
  }
export {getUsageStats};
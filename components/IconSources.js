// IconSources.js
const homeName = 'Home';
const BlockedAppListName = 'Apps Blocked';
const StatisticsName = 'Statistics';
const SettingsName = 'Settings';

export const iconSources = {
  [homeName]: {
    active: require('../assets/images/footericons/activehome.png'),
    inactive: require('../assets/images/footericons/home.png'),
  },
  [BlockedAppListName]: {
    active: require('../assets/images/footericons/activeblocker.png'),
    inactive: require('../assets/images/footericons/blocker.png'),
  },
  [StatisticsName]: {
    active: require('../assets/images/footericons/activestatistic.png'),
    inactive: require('../assets/images/footericons/statistic.png'),
  },
  [SettingsName]: {
    active: require('../assets/images/footericons/activesettings.png'),
    inactive: require('../assets/images/footericons/settings.png'),
  },
};

  
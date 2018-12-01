import moduleBackBtn from './components/module-back-btn.js';
import StatsView from './../view/view-stats.js';

const getStatsScreen = () => {
  const stats = new StatsView();
  const statsScreen = stats.render();

  moduleBackBtn(); // ?

  return statsScreen;
};

export default getStatsScreen;

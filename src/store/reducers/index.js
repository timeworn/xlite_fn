import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import device from './device';
import group from './group';
import user from './user';
import schedule from './schedule';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  device,
  group,
  user,
  schedule
});

export default createRootReducer;

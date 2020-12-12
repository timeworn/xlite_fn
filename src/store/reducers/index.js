import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import device from './device';
import group from './group';
import user from './user';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  device,
  group,
  user
});

export default createRootReducer;

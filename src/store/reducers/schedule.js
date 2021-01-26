import { ScheduleActionTypes } from 'store/actions/schedule';


const initState = {
  selectedSchedule: {
    id: null,
    name: '',
    status: '',
    schedule: '',
    last_updated: '',
    group: {}
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO:
      return { ...state, selectedSchedule: action.schedule };
    default:
      return state;
  }
}

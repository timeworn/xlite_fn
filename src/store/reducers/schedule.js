import { ScheduleActionTypes } from 'store/actions/schedule';


const initState = {
  selectedSchedule: {
    id: null,
    name: '',
    status: 'ACTIVE',
    schedule: '',
    last_updated: '2020-12-06 14:32:25',
    group: {}
  },
  selectedMainSchedule: [
    {
      "date": "Sunday",
      "dim": []
    },
    {
      "date": "Monday",
      "dim": []
    },
    {
      "date": "Tuesday",
      "dim": []
    },
    {
      "date": "Wednesday",
      "dim": []
    },
    {
      "date": "Thursday",
      "dim": []
    },
    {
      "date": "Friday",
      "dim": []
    },
    {
      "date": "Saturday",
      "dim": []
    }
    ]
};

export default (state = initState, action) => {
  switch (action.type) {
    case ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO:
      return { ...state, selectedSchedule: action.schedule };
    case ScheduleActionTypes.SET_MAINSCHEDULE_INFO:
      return { ...state, selectedMainSchedule: action.schedule };
    default:
      return state;
  }
}

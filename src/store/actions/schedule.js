export const ScheduleActionTypes = {
  SET_SELECTEDSCHEDULE_INFO: 'SET_SELECTEDSCHEDULE_INFO'
};


export const setSelectedSchedule = (schedule) => ({
  type: ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO,
  schedule
});


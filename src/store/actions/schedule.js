export const ScheduleActionTypes = {
  SET_SELECTEDSCHEDULE_INFO: 'SET_SELECTEDSCHEDULE_INFO',
  SET_MAINSCHEDULE_INFO: 'SET_MAINSCHEDULE_INFO'
};


export const setSelectedSchedule = (schedule) => ({
  type: ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO,
  schedule
});

export const setMainSchedule = (schedule) => ({
  type: ScheduleActionTypes.SET_MAINSCHEDULE_INFO,
  schedule
})


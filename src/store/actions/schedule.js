export const ScheduleActionTypes = {
  SET_SELECTEDSCHEDULE_INFO: 'SET_SELECTEDSCHEDULE_INFO',
  SET_MAINSCHEDULE_INFO: 'SET_MAINSCHEDULE_INFO'
};


export const setSelectedSchedule = (schedule) => ({
  type: ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO,
  schedule
});

export const setSelectedMainSchedule = (schedule) => ({
  type: ScheduleActionTypes.SET_MAINSCHEDULE_INFO,
  schedule
})


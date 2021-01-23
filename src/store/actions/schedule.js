export const ScheduleActionTypes = {
  SET_SELECTEDSCHEDULE_INFO: 'SET_SELECTEDSCHEDULE_INFO'
};


export const setSelectedSchedule = (group) => ({
  type: ScheduleActionTypes.SET_SELECTEDSCHEDULE_INFO,
  group
});


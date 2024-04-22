import { act } from "react-dom/test-utils";
import { Activity } from "../types";

export type ActivityAction =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activityId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

export type ActivityState = {
  activities: Activity[];
  activityId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activityId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityAction
) => {
  switch (action.type) {
    case "save-activity":
      let updateActivities: Activity[] = [];
      if (state.activityId) {
        updateActivities = state.activities.map((activity) =>
          activity.id === state.activityId
            ? action.payload.newActivity
            : activity
        );
      } else {
        updateActivities = [...state.activities, action.payload.newActivity];
      }
      return {
        ...state,
        activities: updateActivities,
        activityId: "",
      };
    case "set-activityId":
      return {
        ...state,
        activityId: action.payload.id,
      };
    case "delete-activity":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload.id
        ),
      };
    case "restart-app":
      return {
        activities: [],
        activityId: "",
      };
    default:
      return state;
  }
};

import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import {
  ActivityAction,
  ActivityState,
  activityReducer,
  initialState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

// Define the types for the provider
type ActivityProviderProps = {
  children: ReactNode;
};

// Define the types for the context
type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
  caloriesConsumed: number;
  caloriesBurned: number;
  totalCalories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmpty: boolean;
};

// Create the context
export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  // Contadores
  const [caloriesConsumed, caloriesBurned] = useMemo(() => {
    let consumed = 0;
    let burned = 0;

    state.activities.forEach((activity) => {
      if (activity.category === 1) {
        consumed += +activity.calories;
      } else if (activity.category === 2) {
        burned += +activity.calories;
      }
    });

    return [consumed, burned];
  }, [state.activities]);

  // Total de calorías
  const totalCalories = caloriesConsumed - caloriesBurned;

  // Devolver el nombre de la categoría
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmpty = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        totalCalories,
        categoryName,
        isEmpty,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

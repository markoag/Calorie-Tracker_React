import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  readonly activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Contadores
  const [caloriesConsumed, caloriesBurned] = useMemo(() => {
    let consumed = 0;
    let burned = 0;
  
    activities.forEach(activity => {
      if (activity.category === 1) {
        consumed += +activity.calories;
      } else if (activity.category === 2) {
        burned += +activity.calories;
      }
    });
  
    return [consumed, burned];
  }, [activities]);

  // Total de calorías
  const totalCalories = caloriesConsumed - caloriesBurned;

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
            calories={caloriesConsumed}
            text="Consumidas"
        />
        <CalorieDisplay
            calories={caloriesBurned}
            text="Quemadas"
        />
        <CalorieDisplay
            calories={totalCalories}
            text="Total"
        />
      </div>
    </>
  );
}

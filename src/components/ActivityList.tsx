import { useMemo, Dispatch } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityAction } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityAction>;
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  // Devolver el nombre de la categoría
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmpty = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      { isEmpty ? <p className="text-center text-lg text-slate-600 py-3">No hay actividades</p> : null}
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} {""}
              <span>Calorías</span>
            </p>
          </div>

          <div className="flex gap-5 items-center">
              <button onClick={() => dispatch({type: 'set-activityId', payload: {id: activity.id}})}>
                <PencilSquareIcon
                  className="h-6 w-6 text-slate-600"
                />
              </button>
              <button onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}>
                <XCircleIcon
                  className="h-6 w-6 text-red-500"
                />
              </button>
          </div>
        </div>
      ))}
    </>
  );
}

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { useActivity } from "../hooks/useActivity";

// Initial state for the form
const initialActivity: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {

  const { state, dispatch } = useActivity();

  const [activity, setActivity] = useState<Activity>(initialActivity);

  // Set the activity to edit
  useEffect(() => {
    if(state.activityId) {
      const selectedActivity = state.activities.find(stateActivity => stateActivity.id === state.activityId);
      setActivity(selectedActivity || initialActivity);
    }
  }, [state.activityId])

  // Funcion para manejar los cambios en los inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Verificar si el campo es un número
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  // Validar que los campos no estén vacíos
  const isValidForm = () => {
    return activity.name.trim() !== "" && activity.calories > 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviar la acción al reducer
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    // Limpiar el formulario
    setActivity({ ...initialActivity, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Comida(Postre, Ensalada, Batidos), Ejercicio(Correr 3km, Boxer 30min)"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: 300 o 600"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-3 text-white font-bold uppercase cursor-pointer rounded-lg disabled:opacity-50"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidForm()}
      />
    </form>
  );
}

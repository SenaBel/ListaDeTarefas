import React, { createContext, useState, useEffect } from "react";
import ITasks from "../interfaces/ITasks";
import TaskService from "../services/TaskService";

interface TaskContextType {
  tasks: ITasks[];
  addTask: (task: ITasks) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (id: number | undefined, isCompleted: boolean) => void;
  deleteTask: (id: number | undefined) => Promise<void>;
  buscar: boolean;

  shouldFetch: boolean;
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchTasks = async () => {
    const fetchedTasks = await TaskService.getTasks();
    setTasks(fetchedTasks);
  };

  const addTask = async (newTask: Omit<ITasks, "id">) => {
    await TaskService.addTask(newTask);
    setShouldFetch(true);
  };

  const updateTaskStatus = (id: number | undefined, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted } : task
      )
    );

    // Atualiza no servidor
    TaskService.updateTaskStatus(id, isCompleted)
      .then(() => fetchTasks()) // Sincroniza com o servidor
      .catch((error) => console.error("Erro ao atualizar tarefa:", error));
  };

  const deleteTask = (id: number | undefined) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Atualiza o estado local

    // Remove do servidor
    TaskService.deleteTask(id)
      .then(() => fetchTasks()) // Sincroniza com o servidor
      .catch((error) => console.error("Erro ao remover a tarefa:", error));
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        fetchTasks,
        updateTaskStatus,
        deleteTask,
        shouldFetch,
        setShouldFetch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import ITasks from "../interfaces/ITasks";
import TaskService from "../services/TaskService";

interface INotification {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface TaskContextType {
  tasks: ITasks[];
  addTask: (task: ITasks) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (id: string | undefined, isCompleted?: boolean) => void;
  deleteTask: (id: string | undefined) => Promise<void>;
  buscar: boolean;
  shouldFetch: boolean;
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
  notification: INotification | null;
  setNotification: (notification: INotification | null) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const [notification, setNotification] = useState<INotification | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchTasks = async () => {
    const fetchedTasks = await TaskService.getTasks();
    setTasks(fetchedTasks);
  };

  const addTask = async (newTask: Omit<ITasks, "id">) => {
    await TaskService.addTask(newTask);
    setShouldFetch(true);
  };

  const updateTaskStatus = (id: string | undefined, isCompleted: boolean) => {
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

  const deleteTask = async (id: string | undefined): Promise<void> => {
    try {
      await TaskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Atualiza o estado local
      setNotification({
        message: "Tarefa foi excluída com sucesso!",
        type: "warning",
      });
      fetchTasks(); // Opcional: sincroniza o estado com o servidor
    } catch (error) {
      console.error("Erro ao remover a tarefa:", error);
      setNotification({
        message: "Erro ao excluir a tarefa, por favor verifique...",
        type: "error",
      });
    }
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
        notification,
        setNotification,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

import { useEffect, useState, useContext } from "react";

import { TaskContext } from "../../context/TaskContext";

function useListTasks() {
  const context = useContext(TaskContext);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!context) {
    throw new Error("useListTasks must be used within a TaskProvider");
  }

  const {
    tasks,
    fetchTasks,
    shouldFetch,
    setShouldFetch,
    updateTaskStatus,
    deleteTask,
    notification,
    setNotification,
    openModal,
    setOpenModal,
  } = context;

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      try {
        setIsLoading(true);
        await fetchTasks();
        setShouldFetch(false);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setIsLoading(false);
        setShouldFetch(false);
      }
    };

    if (shouldFetch) {
      fetchAndSetTasks();
    }
  }, [fetchTasks, shouldFetch, setShouldFetch]);

  return {
    tasks,
    isLoading,
    error,
    onChangeStatus: (id: number | undefined) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        updateTaskStatus(id, !task.isCompleted);
      }
    },
    onRemoveTask: (id: number | undefined) => {
      deleteTask(id);
    },
    notification,
    setNotification,
    openModal,
    setOpenModal,
  };
}

export default useListTasks;

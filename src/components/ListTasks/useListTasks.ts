import { useEffect, useState, useContext } from "react";

import { TaskContext } from "../../contexts/TaskContext";
import { useNavigate } from "react-router-dom";

function useListTasks() {
  const context = useContext(TaskContext);
  const navigate = useNavigate();

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
        setError("Buscando Tarefas....");
      } finally {
        setIsLoading(false);
        setShouldFetch(false);
      }
    };

    if (shouldFetch) {
      fetchAndSetTasks();
    }
  }, [fetchTasks, shouldFetch, setShouldFetch]);

  function onSeeDetailsClick(id: string | undefined) {
    const queryParams = new URLSearchParams();
    queryParams.set("id", id || "");
    navigate(`/getTasks/${id}`);
  }

  return {
    tasks,
    isLoading,
    error,
    onChangeStatus: (id: string | undefined) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        updateTaskStatus(id, !task.isCompleted);
      }
    },
    onRemoveTask: (id: string | undefined) => {
      deleteTask(id);
    },
    notification,
    setNotification,
    openModal,
    setOpenModal,
    onSeeDetailsClick,
  };
}

export default useListTasks;

import { useContext, useState } from "react";

import { TaskContext } from "../../contexts/TaskContext";

function useListTasks() {
  const context = useContext(TaskContext);

  const [title, settitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  if (!context) {
    throw new Error("Contextos de tarefa ou notificação não encontrados");
  }

  const { addTask, setShouldFetch, notification, setNotification } = context;

  async function onAddTask() {
    let hasError: boolean = false;

    if (!title) {
      setTitleError("Campo obrigatório");
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (!description) {
      setDescriptionError("Campo obrigatório");
      hasError = true;
    } else {
      setDescriptionError(null);
    }

    if (hasError) return;

    try {
      await addTask({ id: "", title, description, isCompleted: false });
      // Exibe notificação de sucesso
      setNotification({
        message: "Tarefa foi adicionada com sucesso!",
        type: "success",
      });
      settitle("");
      setDescription("");
    } catch (error) {
      // Exibe notificação de erro
      setNotification({
        message: "Erro ao adicionar a tarefa!",
        type: "error",
      });
    }
    setShouldFetch(true);

    // addTask({ id: 0, title, description, isCompleted: false });
    // // fetchTasks();
    // setShouldFetch(true);

    // settitle("");
    // setDescription("");
  }

  return {
    onAddTask,
    title,
    settitle,
    notification,
    setNotification,
    titleError,
    setTitleError,
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
  };
}

export default useListTasks;

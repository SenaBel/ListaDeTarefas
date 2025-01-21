import { useContext, useState } from "react";

import { TaskContext } from "../../contexts/TaskContext";
import ITasks from "../../interfaces/ITasks";

function useListTasks() {
  const context = useContext(TaskContext);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [formTask, setFormTask] = useState<ITasks>([] as unknown as ITasks);

  if (!context) {
    throw new Error("Contextos de tarefa ou notificação não encontrados");
  }

  const { addTask, setShouldFetch, notification, setNotification } = context;

  async function onAddTask(formData: FormData, formElement: HTMLFormElement) {
    let hasError: boolean = false;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

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
      await addTask({
        id: "",
        title,
        description,
        isCompleted: false,
      });
      // Exibe notificação de sucesso
      setNotification({
        message: "Tarefa foi adicionada com sucesso!",
        type: "success",
      });

      formElement.reset();
    } catch (error) {
      // Exibe notificação de erro
      setNotification({
        message: "Erro ao adicionar a tarefa!",
        type: "error",
      });
    }
    setShouldFetch(true);
  }

  return {
    onAddTask,

    notification,
    setNotification,
    titleError,
    setTitleError,
    //description,
    //setDescription,
    descriptionError,
    setDescriptionError,
  };
}

export default useListTasks;

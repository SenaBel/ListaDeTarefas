import { useContext, useState } from "react";

import { TaskContext } from "../../contexts/TaskContext";
import validarCampo from "../../hooks/validarCampo";

function useListTasks() {
  const contextOfTask = useContext(TaskContext);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  if (!contextOfTask) {
    throw new Error("Contextos de tarefa ou notificação não encontrados");
  }

  const { addTask, setShouldFetch, notification, setNotification } =
    contextOfTask;

  function validarTask(formData: FormData): boolean {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const isTitleValid = validarCampo(
      title,
      setTitleError,
      "Campo obrigatório"
    );

    const isDescriptionValid = validarCampo(
      description,
      setDescriptionError,
      "Campo obrigatório"
    );
    return isTitleValid && isDescriptionValid;
  }

  async function onAddTask(formData: FormData, formElement: HTMLFormElement) {
    if (!validarTask(formData)) return;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

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

  function handleSumit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    onAddTask(new FormData(e.target as HTMLFormElement), formElement);
  }

  return {
    handleSumit,
    notification,
    setNotification,
    titleError,
    setTitleError,
    descriptionError,
    setDescriptionError,
  };
}

export default useListTasks;

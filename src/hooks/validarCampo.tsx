function validarCampo(
  campo: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  mensagemErro: string
) {
  if (!campo) {
    setError(mensagemErro);
    return false;
  } else {
    setError(null);
    return true;
  }
}

export default validarCampo;

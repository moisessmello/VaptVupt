import * as Yup from "yup";

export const ServicosValidator = Yup.object().shape({
  nome: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  descricao: Yup.string()
    .required("A descrição é obrigatória")
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  orgao: Yup.string()
    .required("O órgão é obrigatório"),
  valor: Yup.string()    
  .required("O valor é obrigatório"),
});

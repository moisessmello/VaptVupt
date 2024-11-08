import * as Yup from "yup";

export const FuncionariosValidator = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .required("CPF é obrigatório"),
  data_nascimento: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida")
    .required("Data de nascimento é obrigatória"),
  genero: Yup.string()
    .required("Gênero é obrigatório"),
  cargo: Yup.string()
    .required("Cargo é obrigatório"),
  telefone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),
});

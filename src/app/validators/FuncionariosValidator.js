import * as Yup from 'yup';

export const FuncionariosValidator = Yup.object().shape({
  nome: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  genero: Yup.string()
    .required("O gênero é obrigatório")
    .oneOf(["Masculino", "Feminino", "Outro"], "Escolha uma opção válida"),
  cargo: Yup.string()
    .required("O cargo é obrigatório"),
  telefone: Yup.string()
    .required("O telefone é obrigatório")
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
});

 


import * as Yup from 'yup';

export const ClientesValidator = Yup.object().shape({
    nome: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
telefone: Yup.string()
    .required("O celular é obrigatório")
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
email: Yup.string()
    .email("Email inválido")
    .required("O email é obrigatório"),
});


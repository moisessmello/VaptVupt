import * as Yup from 'yup';

export const OrgaosValidator = Yup.object().shape({
    nome: Yup.string()
        .required("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    cnpj: Yup.string()
        .required("O CNPJ é obrigatório")
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
    telefone: Yup.string()
        .required("O telefone é obrigatório")
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    email: Yup.string()
        .email("Email inválido")
        .required("O email é obrigatório"),
});


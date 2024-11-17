import * as Yup from "yup";

export const VaptVuptValidator = Yup.object().shape({
  orgao: Yup.string().required("O órgão é obrigatório."),
  servico: Yup.string().required("O serviço é obrigatório."),
  pais: Yup.string().required("O país é obrigatório."),
  uf: Yup.string().required("a UF é obrigatória"),
  cidade: Yup.string().required("a Cidade é obrigatória"),
});

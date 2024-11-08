"use client";

import { OrgaosValidator } from "@/app/validators/OrgaosValidator";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
  const route = useRouter();

  const orgaos = JSON.parse(localStorage.getItem("orgaos")) || [];
  const dados = orgaos.find((item) => item.id == params.id);
  const orgao = dados || { nome: "", cnpj: "", telefone: "", email: "" };

  function salvar(dados) {
    if (orgao.id) {
      Object.assign(orgao, dados);
    } else {
      dados.id = v4();
      orgaos.push(dados);
    }

    localStorage.setItem("orgaos", JSON.stringify(orgaos));
    route.push("/admin/orgaos");
  }

  return (
    <Pagina titulo="Órgãos">
      <Formik
        initialValues={orgao}
        validationSchema={OrgaosValidator}
        onSubmit={(values) => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, setFieldValue }) => {
          // Função para aplicar a máscara aos campos CNPJ e telefone
          function handleMaskedChange(event, maskPattern, field) {
            setFieldValue(field, mask(event.target.value, maskPattern));
          }

          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  isInvalid={!!errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="cnpj">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  name="cnpj"
                  value={values.cnpj}
                  onChange={(e) => handleMaskedChange(e, "99.999.999/9999-99", "cnpj")}
                  isInvalid={!!errors.cnpj}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cnpj}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={values.telefone}
                  onChange={(e) => handleMaskedChange(e, "(99) 99999-9999", "telefone")}
                  isInvalid={!!errors.telefone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Link href="/admin/orgaos" className="btn btn-danger me-3">
                  <MdOutlineArrowBack /> Voltar
                </Link>
                <Button type="submit" variant="success" >
                  Salvar <FaCheck />
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}

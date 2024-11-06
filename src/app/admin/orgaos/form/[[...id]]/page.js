"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
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
    return route.push("/admin/orgaos");
  }

  return (
    <Pagina titulo="Órgãos">
      <Formik initialValues={orgao} onSubmit={(values) => salvar(values)}>
        {({ values, handleChange, handleSubmit, errors }) => {
          return (
            <Form>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange("nome")}
                  isInvalid={errors.nome}
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
                  onChange={handleChange("cnpj")}
                  isInvalid={errors.cnpj}
                />
                <div className="text-danger">{errors.cnpj}</div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={values.telefone}
                  onChange={handleChange("telefone")}
                  isInvalid={errors.telefone}
                />
                <div className="text-danger">{errors.telefone}</div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  isInvalid={errors.email}
                />
                <div className="text-danger">{errors.email}</div>
              </Form.Group>
              <div className="text-center">
                <Link href="/admin/orgaos" className="btn btn-danger me-3">
                  <MdOutlineArrowBack /> Voltar
                </Link>
                <Button type="submit" variant="success" onClick={handleSubmit}>
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

"use client";

import { FuncionariosValidator } from "@/app/validators/FuncionariosValidator";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page() {
  const route = useRouter();

  function salvar(dados) {
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    dados.id = v4();
    funcionarios.push(dados);
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    return route.push(`/admin/funcionarios`);
  }

  return (
    <Pagina titulo="Funcionários">
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={8}>
            <h2 className="text-center mt-4">Dados Funcionários</h2>
            <Formik
              initialValues={{
                nome: "",
                cpf: "",
                genero: "",
                cargo: "",
                telefone: "",
              }}
              validationSchema={FuncionariosValidator}
              onSubmit={(values) => salvar(values)}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => {
                
                values.cpf = mask(values.cpf, "999.999.999-99")
                values.telefone = mask(values.telefone, "(99) 99999-9999")
                
                return (
                  <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange("nome")}
                        isInvalid={touched.nome && !!errors.nome}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nome}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cpf">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange("cpf")}
                        isInvalid={touched.cpf && !!errors.cpf}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cpf}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="genero">
                      <Form.Label>Gênero</Form.Label>
                      <Form.Select
                        name="genero"
                        value={values.genero}
                        onChange={handleChange("genero")}
                        isInvalid={touched.genero && !!errors.genero}
                      >
                        <option value="">Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.genero}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cargo">
                      <Form.Label>Cargo</Form.Label>
                      <Form.Control
                        type="text"
                        name="cargo"
                        value={values.cargo}
                        onChange={handleChange("cargo")}
                        isInvalid={touched.cargo && !!errors.cargo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cargo}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telefone">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="text"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleChange("telefone")}
                        isInvalid={touched.telefone && !!errors.telefone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefone}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center mt-4">
                      <Link href="/admin/funcionarios" className="btn btn-danger me-3">
                        <MdOutlineArrowBack /> Voltar
                      </Link>
                      <Button type="submit" variant="success">
                        Salvar <FaCheck />
                      </Button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Pagina>
  );
}

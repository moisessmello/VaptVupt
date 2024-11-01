"use client";

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page() {
 
   const route = useRouter()

  function salvar(dados) {
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    dados.id = v4();
    funcionarios.push(dados);
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    return route.push(`/funcionario`);
  }

  return (
    <>
      <Pagina titulo="Funcionário">
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
                onSubmit={(values) => salvar(values)}
              >
                {({ values, handleChange, handleSubmit }) => {
                  

                  return (
                    <Form className="w-100" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          name="nome"
                          value={values.nome}
                          onChange={handleChange("nome")}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                          type="text"
                          name="cpf"
                          value={values.cpf}
                          onChange={handleChange("cpf")}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="genero">
                        <Form.Label>Gênero</Form.Label>
                        <Form.Control
                          type="text"
                          name="genero"
                          value={values.genero}
                          onChange={handleChange("genero")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="cargo">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                          type="text"
                          name="cargo"
                          value={values.cargo}
                          onChange={handleChange("cargo")}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefone"
                          value={values.telefone}
                          onChange={handleChange("telefone")}
                        />
                      </Form.Group>
                      
                      <div className="text-center mt-4">
                        <Link href="/funcionario" className="btn btn-danger me-3">
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
            </Col>
          </Row>
        </Container>
      </Pagina>

      <footer className="bg-dark text-white text-center p-4 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <Image
                src="https://vaptvupt.go.gov.br/assets/externo/img/logo-vapt-vupt.png"
                alt="Logo VaptVupt"
                style={{ width: "100px" }}
              />
            </Col>
            <Col md={4}>
              <h5>Localização</h5>
              <p>
                Avenida Central, 1234
                <br />
                Centro, Águas Lindas - GO - 72.910-000
              </p>
            </Col>
            <Col md={4}>
              <h5>Contato</h5>
              <p>
                Telefone: (61) 3613-0000
                <br />
                Email: contato@vaptvupt.com
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <p>&copy; 2024 VaptVupt - Todos os direitos reservados</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

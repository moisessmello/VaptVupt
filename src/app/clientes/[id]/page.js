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

export default function Page({ params }) {
  const route = useRouter();
  const dataAgendamentos = JSON.parse(localStorage.getItem("dataAgendamentos")) || [];
  const dataAgendamentoBuscado =dataAgendamentos.find(item => item.id == params.id)



  function salvar(dados) {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const clienteNovo = {

      id: v4(),
      nome: dados.nome,
      cpf: dados.cpf,
      telefone: dados.telefone,
      email: dados.email,
      dataAgendamento: dataAgendamentoBuscado
    }
    clientes.push(clienteNovo)    
    localStorage.setItem("clientes", JSON.stringify(clientes));
    return route.push(`/salvarAgendamentos/${clienteNovo.id}`);
  }


  return (
    <>
      <Pagina titulo="Clientes">
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <Row className="w-100 justify-content-center">
            <Col md={8}>
              <h2 className="text-center mt-4">Dados Pessoais</h2>
              <Formik
                initialValues={{
                  nome: "",
                  cpf: "",
                  telefone: "",
                  email: "",
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
                      <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefone"
                          value={values.telefone}
                          onChange={handleChange("telefone")}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange("email")}
                        />
                      </Form.Group>

                      <div className="text-center mt-4">
                        <Link href="/vaptvupt" className="btn btn-danger me-3">
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

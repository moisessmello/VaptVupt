"use client";
import * as Yup from "yup";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { ClientesValidator } from "@/app/validators/ClientesValidator";
import { mask } from "remask";

export default function Page({ params }) {
  const route = useRouter();
  const dataAgendamentos = JSON.parse(localStorage.getItem("dataAgendamentos")) || [];
  const dataAgendamentoBuscado = dataAgendamentos.find(
    (item) => item.id == params.id
  );

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const dados = clientes.find((item) => item.id == params.id) || {
    nome: "",
    tipo_documento: "",
    documento: "",
    telefone: "",
    email: "",
  };

  function salvar(dados) {
    let clienteNovo = null;

    if (dados.id) {
      // Atualizando cliente existente
      const index = clientes.findIndex((item) => item.id === dados.id);
      if (index !== -1) {
        clientes[index] = { ...clientes[index], ...dados }; // Atualiza somente os campos alterados
      }
    } else {
      // Criando um novo cliente
      clienteNovo = {
        id: v4(),
        nome: dados.nome,
        tipo_documento: dados.tipo_documento,
        documento: dados.documento,
        telefone: dados.telefone,
        email: dados.email,
        dataAgendamento: dataAgendamentoBuscado,
      };
      clientes.push(clienteNovo);
    }

    // Atualizando o localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Redirecionando para a página de confirmação
    const id = dados.id || clienteNovo?.id; // Garante que clienteNovo exista antes de acessar o id
    route.push(`/salvarAgendamentos/${id}`);
  }

  return (
    <>
      <Pagina titulo="Clientes">
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <Row className="w-100 justify-content-center">
            <Col md={8}>
              <h2 className="text-center mt-4">Dados Pessoais</h2>
              <Formik
                initialValues={dados}
                validationSchema={ClientesValidator}
                onSubmit={(values) => salvar(values)}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  setFieldValue,
                }) => {
                  useEffect(() => {
                    if (values.tipo_documento === "CPF") {
                      setFieldValue(
                        "documento",
                        mask(values.documento, "999.999.999-99")
                      );
                    } else if (values.tipo_documento === "CNPJ") {
                      setFieldValue(
                        "documento",
                        mask(values.documento, "99.999.999/9999-99")
                      );
                    }
                  }, [values.tipo_documento, values.documento, setFieldValue]);

                  values.telefone = mask(values.telefone, "(99) 99999-9999");
                  return (
                    <Form className="w-100" onSubmit={handleSubmit}>
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

                      <Form.Group className="mb-3" controlId="tipo_documento">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select
                          name="tipo_documento"
                          value={values.tipo_documento}
                          onChange={(e) => {
                            const novoTipo = e.target.value;
                            setFieldValue("tipo_documento", novoTipo);
                            setFieldValue("documento", ""); // Limpa o campo de documento
                          }}
                        >
                          <option value="">Selecione</option>
                          <option value="CPF">CPF</option>
                          <option value="CNPJ">CNPJ</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="documento">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control
                          type="text"
                          name="documento"
                          value={values.documento}
                          onChange={handleChange}
                          isInvalid={!!errors.documento}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.documento}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefone"
                          value={mask(values.telefone, "(99) 99999-9999")}
                          onChange={handleChange}
                          isInvalid={!!errors.telefone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.telefone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
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

                      <div className="text-center mt-4">
                        <Link
                          href={`/dataAgendamentos/${dataAgendamentoBuscado?.vaptvupt?.id}`}
                          className="btn btn-danger me-3"
                        >
                          <MdOutlineArrowBack /> Voltar
                        </Link>
                        <Button type="submit" variant="success">
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

      {/* Rodapé */}
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

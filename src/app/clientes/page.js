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
  const route = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [paises, setPaises] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [camposBrasil, setCamposBrasil] = useState(false);

  useEffect(() => {
    apiLocalidade.get(`paises`).then(resultado => {
      setPaises(resultado.data);
    });

    apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
      setUfs(resultado.data);
    });
  }, []);

  function salvar(dados) {
    const vaptvupt = JSON.parse(localStorage.getItem("vaptvupt")) || [];
    dados.id = v4();
    vaptvupt.push(dados);
    localStorage.setItem("vaptvupt", JSON.stringify(vaptvupt));
    return route.push(`/....${dados.id}`);
  }

  function handleAvancar() {
    route.push("/orgao"); // Substitua "/proxima-pagina" pela rota da página desejada
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
                  orgao: "",
                  servico: "",
                  uf: "",
                  municipio: "",
                  pais: "Brasil",
                }}
                onSubmit={(values) => salvar(values)}
              >
                {({ values, handleChange, handleSubmit }) => {
                  useEffect(() => {
                    setCamposBrasil(values.pais === 'Brasil');
                  }, [values.pais]);

                  useEffect(() => {
                    if (values.uf) {
                      apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                        setCidades(resultado.data);
                      });
                    }
                  }, [values.uf]);

                  return (
                    <Form className="w-100" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          name="orgao"
                          value={values.orgao}
                          onChange={handleChange("orgao")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="servico">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                          type="text"
                          name="servico"
                          value={values.servico}
                          onChange={handleChange("servico")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefone"
                          value={values.servico}
                          onChange={handleChange("servico")}
                        />
                      </Form.Group>
                      {camposBrasil &&
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={values.servico}
                            onChange={handleChange("servico")}
                          />
                        </Form.Group>
                      }
                      <div className="text-center mt-4">
                        <Link href="/vaptvupt" className="btn btn-danger me-3">
                          <MdOutlineArrowBack /> Voltar
                        </Link>
                        <Button type="submit" variant="success" onClick={handleAvancar}>
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

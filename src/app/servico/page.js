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

  return (
    <>
      <Pagina titulo="Serviços">
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <Row className="w-100 justify-content-center">
            <Col md={8}>
              <h2 className="text-center mt-4">Dados dos Serviços</h2>
              <Formik
                initialValues={{
                  servico: "",
                  descricao: "",
                                    
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
                      <Form.Group className="mb-3" controlId="servico">
                        <Form.Label>Serviço</Form.Label>
                        <Form.Control
                          type="text"
                          name="servico"
                          value={values.orgao}
                          onChange={handleChange("servico")}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          type="text"
                          name="descricao"
                          value={values.servico}
                          onChange={handleChange("descricao")}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="valor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="text"
                          name="valor"
                          value={values.servico}
                          onChange={handleChange("valor")}
                        />
                      </Form.Group>


                      <div className="text-center mt-4">
                        <Link href="/dataAgendamento/id" className="btn btn-danger me-3">
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

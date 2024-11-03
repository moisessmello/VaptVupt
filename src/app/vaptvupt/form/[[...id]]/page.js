"use client";

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { v4 } from "uuid";

export default function Page() {
  const route = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paises, setPaises] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [camposBrasil, setCamposBrasil] = useState(false);
  const [orgaos, setOrgaos] = useState([]); // Estado para armazenar os órgãos
  const [orgaoSelecionado, setOrgaoSelecionado] = useState(""); // Estado para armazenar o órgão selecionado

  useEffect(() => {
    // Carregar países e UFs
    apiLocalidade.get(`paises`).then((resultado) => {
      setPaises(resultado.data);
    });

    apiLocalidade.get(`estados?orderBy=nome`).then((resultado) => {
      setUfs(resultado.data);
    });

    // Carregar órgãos
    apiLocalidade.get(`orgaos`).then((resultado) => {
      setOrgao(resultado.data); // Substitua "resultado.data" pelo caminho correto dos dados
    });
  }, []);

  function salvar(dados) {
    const vaptvupt = JSON.parse(localStorage.getItem("vaptvupt")) || [];
    dados.id = v4();
    vaptvupt.push(dados);
    localStorage.setItem("vaptvupt", JSON.stringify(vaptvupt));
    return route.push(`/dataAgendamentos/${dados.id}`);
  }

  const handleCardClick = () => {
    setIsClicked(!isClicked);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Carrega os órgãos do Local Storage
    const dadosOrgaos = JSON.parse(localStorage.getItem("orgaos")) || [];
    setOrgaos(dadosOrgaos);

    // Carrega o órgão selecionado do Local Storage
    const orgaoSalvo = localStorage.getItem("selectedOrgao");
    if (orgaoSalvo) {
      setOrgaoSelecionado(orgaoSalvo);
    }
  }, []);

  return (
    <>
      <Pagina titulo="Unidades de Atendimento">
        <h2 className="text-center mt-4">Unidades</h2>

        <Container>
          <Row className="mt-4" style={{ gap: "50px" }}>
            <Col md={7}>
              <Formik
                initialValues={{
                  nome: "",
                  pais: "Brasil",
                  uf: "",
                  cidade: "",
                  orgao: "", // Adicionar o campo orgao
                }}
                onSubmit={(values) => salvar(values)}
              >
                {({ values, 
                handleChange, 
                handleSubmit }) => {

                  useEffect(() => {
                    setCamposBrasil(values.pais == "Brasil");
                  }, [values.pais]);

                  useEffect(() => {
                    apiLocalidade
                      .get(`estados/${values.uf}/municipios`)
                      .then((resultado) => {
                        setCidades(resultado.data);
                      });
                  }, [values.uf]);

                  return (
                    <Form className="w-100">
                      {/* Select de Órgão */}
                      <Form.Group className="mb-3" controlId="nome do orgao">
                        <Form.Label>Nome do órgão</Form.Label>
                        <Form.Select
                          name="orgao"
                          value={values.orgao || orgaoSelecionado} // Usa o valor do Local Storage ou o valor do formulário
                          onChange={handleChange("orgao")}
                        >
                          <option value="">Selecione</option>
                          {orgaos.length > 0 ? ( // Verifica se existem órgãos para mapear
                            orgaos.map((item) => (
                              <option key={item.id} value={item.nome}>
                                {item.nome}
                              </option>
                            ))
                          ) : (
                            <option value="">Nenhum órgão disponível</option> // Mensagem se não houver órgãos
                          )}
                        </Form.Select>
                      </Form.Group>

                      {/* Outros campos */}
                      <Form.Group className="mb-3" controlId="pais">
                        <Form.Label>País</Form.Label>
                        <Form.Select
                          name="pais"
                          value={values.pais}
                          onChange={handleChange("pais")}
                        >
                          <option value="">Selecione</option>
                          {paises.map((item) => (
                            <option key={item.nome} value={item.nome}>
                              {item.nome}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      {camposBrasil && (
                        <>
                          <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>UF</Form.Label>
                            <Form.Select
                              name="uf"
                              value={values.uf}
                              onChange={handleChange("uf")}
                            >
                              <option value="">Selecione</option>
                              {ufs.map((item) => (
                                <option key={item.sigla} value={item.sigla}>
                                  {item.sigla} - {item.nome}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Select
                              name="cidade"
                              value={values.cidade}
                              onChange={handleChange("cidade")}
                            >
                              <option value="">Selecione</option>
                              {cidades.map((item) => (
                                <option key={item.nome} value={item.nome}>
                                  {item.nome}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </>
                      )}

                      <div className="text-center mt-4">
                        <Link href="/vaptvupt" className="btn btn-danger me-3">
                          <MdOutlineArrowBack /> Voltar
                        </Link>
                        <Button onClick={handleSubmit} variant="success">
                          Salvar <FaCheck />
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>

            <Col
              md={3}
              className="d-flex justify-content-center align-items-center"
            >
              <Card
                onClick={handleCardClick}
                style={{
                  width: "200%",
                  backgroundColor: isClicked ? "#d4edda" : "#fff",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                <Card.Body className="d-flex align-items-center">
                  <MdOutlineDateRange size={40} className="me-3" />
                  <div>
                    <Card.Title>Agendamento por data</Card.Title>
                    <Card.Text>
                      Escolha a data que melhor se ajusta à sua agenda.
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Modal de erro */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title className="w-100 text-center">
              <h1>Atenção</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            Primeiro escolha Serviço e Município.
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="success" onClick={handleCloseModal}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
      </Pagina>
      <footer className="bg-dark text-white text-center p-4 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <Image
                src="https://vaptvupt.go.gov.br/assets/externo/img/logo-vapt-vupt.png"
                alt="Logo Poupa Tempo"
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

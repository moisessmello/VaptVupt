"use client";

import Pagina from "@/components/Pagina";
import { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleConfirm = () => {
    setShowModal(false);
    window.location.href = "./vaptvupt/form/id";
  };

  return (
    <>
      <Pagina titulo="VaptVupt">
        <Container className="mt-4">
          <h2 className="text-center mb-4">Agendamentos Disponíveis</h2>
          <Carousel>
            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="https://despachantepinguim.com.br/wp-content/uploads/2022/03/detran-go-2-1024x297.png" // Substitua por uma URL válida
                  alt="Imagem Detran"
                  className="d-block"
                  style={{
                    maxHeight: "300px",
                    maxWidth: "70%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Carousel.Caption>
                <h3 style={{ color: "black" }}></h3>
                <p style={{ color: "black" }}></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="https://voleipro.com.br/wp-content/uploads/2022/10/6-Logo-Saneago-Horizontal-Azul.png"
                  alt="Imagem Saneago"
                  className="d-block"
                  style={{
                    maxHeight: "300px",
                    maxWidth: "70%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/institucional/institucional/@@govbr.institucional.banner/e930066d-da35-4622-82e2-e3a041be6a43/@@images/df48efaf-d23e-4ada-a756-83a95609267f.png" // Substitua por uma URL válida
                  alt="Imagem Receita Federal"
                  className="d-block"
                  style={{
                    maxHeight: "300px",
                    maxWidth: "80%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="https://logodownload.org/wp-content/uploads/2021/03/equatorial-logo.png"
                  alt="Imagem Equatorial"
                  className="d-block"
                  style={{
                    maxHeight: "300px",
                    maxWidth: "70%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className="text-center mt-3">
            <Button variant="dark" onClick={handleShow}>
              Agendar Atendimento
            </Button>
          </div>

          <Modal
            show={showModal}
            onHide={handleClose}
            centered
            className="slide-up"
            style={{ borderRadius: "100px" }}
          >
            <Modal.Header closeButton>
              <Modal.Title className="w-100 text-center">
                <h1>Atenção</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Você gostaria de prosseguir com o agendamento?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={handleConfirm}
                className="ms-2"
              >
                Prosseguir
              </Button>
            </Modal.Footer>
          </Modal>


          <h2 className="text-center mt-5 mb-4">
            Informações de Utilidade Pública
          </h2>
          <Row>
            <Col md={12}>
              <ul>
                <li>Emergência Policial: Ligue 190</li>
                <li>Corpo de Bombeiros: Ligue 193</li>
                <li>
                  Serviço de Atendimento Móvel de Urgência (SAMU): Ligue 192
                </li>
                <li>Central de Atendimento à Mulher: Ligue 180</li>
                <li>Defesa Civil: Ligue 199</li>
                <li>Atendimento para falta de energia: Ligue 0800 123 456</li>
              </ul>
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

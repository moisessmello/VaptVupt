"use client";

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export default function AdminPage() {
  return (
    <Pagina titulo="Administração">
      <Container className="d-flex flex-column align-items-center">
        <h2 className="text-center my-4">Página de Cadastro</h2>
        <Row className="justify-content-center">
         
          <Col xs={12} md={4} className="mb-4">
            <Card className="h-100"> 
              <Card.Img
                variant="top"
                src="https://blog.deliverydireto.com.br/wp-content/uploads/2017/10/71-1.png"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Funcionários</Card.Title>
                <Link href="/funcionarios" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

        
          <Col xs={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/odiariodovale.com/wp-content/uploads/2023/06/governo-lula-brasil-uniao-e-reconstrucao.jpg?fit=720%2C480&ssl=1"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Orgãos</Card.Title>
                <Link href="/orgaos" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

        
          <Col xs={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://telesintese.com.br/wp-content/uploads/2020/03/aplicativos-servicos-app-sistema-pagamento-investimento-ideias-grafico-planilha-nuvem-resultados-001.jpg"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Serviços</Card.Title>
                <Link href="/servicos" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Pagina>
  );
}

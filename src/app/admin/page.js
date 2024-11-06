"use client";

import PaginaLogada from "@/components/PaginaLogada";
import Link from "next/link";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export default function AdminPage() {
  return (
    <PaginaLogada titulo="Administração">
      <Container className="d-flex flex-column align-items-center">
        <h2 className="text-center my-4">Página de Cadastro</h2>
        <Row className="justify-content-center">
         
          <Col xs={12} md={3} className="mb-4">
            <Card className="h-100"> 
              <Card.Img
                variant="top"
                src="https://blog.deliverydireto.com.br/wp-content/uploads/2017/10/71-1.png"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Funcionários</Card.Title>
                <Link href="/admin/funcionarios" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

        
          <Col xs={12} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/odiariodovale.com/wp-content/uploads/2023/06/governo-lula-brasil-uniao-e-reconstrucao.jpg?fit=720%2C480&ssl=1"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Orgãos</Card.Title>
                <Link href="/admin/orgaos" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

        
          <Col xs={12} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://telesintese.com.br/wp-content/uploads/2020/03/aplicativos-servicos-app-sistema-pagamento-investimento-ideias-grafico-planilha-nuvem-resultados-001.jpg"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Serviços</Card.Title>
                <Link href="/admin/servicos" passHref>
                  <Button variant="dark">Cadastrar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://www.coopersystem.com.br/wp-content/uploads/2023/09/dashboard-o-que-e-para-que-serve-e-tipos.jpg"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Dashboard</Card.Title>
                <Link href="/admin/dashboard" passHref>
                  <Button variant="dark">Visualizar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PaginaLogada>
  );
}

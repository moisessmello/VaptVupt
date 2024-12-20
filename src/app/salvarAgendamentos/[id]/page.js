"use client";

import Pagina from "@/components/Pagina";
import { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Image } from "react-bootstrap";
import jsPDF from "jspdf";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function ConfirmacaoAgendamento({ params }) {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find(item => item.id == params.id)

  const dataAgendamentos = JSON.parse(localStorage.getItem("dataAgendamentos"));
  const dataAgendamento = dataAgendamentos.find(item => item.id == cliente.dataAgendamento.id)

  const vaptvupts = JSON.parse(localStorage.getItem("vaptvupt"));
  const vaptvupt = vaptvupts.find(item => item.id == dataAgendamento.vaptvupt.id)

  const orgaos = JSON.parse(localStorage.getItem("orgaos"));
  const orgao = orgaos.find(item => item.nome == vaptvupt.orgao);

  console.log(orgao)

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.text("Confirmação de Agendamento", 20, 20);
    doc.text(`Nome: ${cliente.nome}`, 20, 30);
    doc.text(`CPF: ${cliente.documento}`, 20, 40);
    doc.text(`Email: ${cliente.email}`, 20, 50);
    doc.text(`Telefone: ${cliente.telefone}`, 20, 60);
    doc.text(`Órgão: ${orgao.nome}`, 20, 80);

    doc.text(`Serviço: ${vaptvupt.servico}`, 20, 100);
    doc.text(`Data: ${dataAgendamento.start}`, 20, 110);
    doc.text(`Hora: ${dataAgendamento.hora}`, 20, 120);


    doc.save("agendamento_confirmacao.pdf");
  };

  return (
    <>
      <Pagina titulo="Agendar Atendimento Presencial">
        <Container>
          <h1 className="text-center mt-5">Resumo do Agendamento</h1>

          <Table
            striped
            hover
            className="mt-5"
            style={{
              borderRadius: '15px',
              border: '2px solid #007bff',
              boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
              overflow: 'hidden',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th colSpan="2" className="text-center bg-primary text-white">
                  Dados do Cliente
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nome</strong></td>
                <td>{cliente.nome}</td>
              </tr>
              <tr>
                <td><strong>{cliente.tipo_documento}</strong></td>
                <td>{cliente.documento}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{cliente.email}</td>
              </tr>
              <tr>
                <td><strong>Telefone</strong></td>
                <td>{cliente.telefone}</td>
              </tr>
            </tbody>
          </Table>

          <Table
            striped
            hover
            className="mt-5"
            style={{
              borderRadius: '15px',
              border: '2px solid #007bff',
              boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
              overflow: 'hidden',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th colSpan="2" className="text-center bg-secondary text-white">
                  Dados do Agendamento
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Órgão</strong></td>
                <td>{orgao.nome}</td>
              </tr>

              <tr>
                <td><strong>Serviço</strong></td>
                <td>{vaptvupt.servico}</td>
              </tr>
              <tr>
                <td><strong>Data</strong></td>
                <td>{dataAgendamento.start}</td>
              </tr>
              <tr>
                <td><strong>Hora</strong></td>
                <td>{dataAgendamento.hora}</td>
              </tr>
            </tbody>
          </Table>

          <div className="text-center">
            <Link href={`/clientes/${cliente.id}`} className="btn btn-danger me-3">
              <MdOutlineArrowBack /> Voltar
            </Link>
            <Button variant="primary" onClick={gerarPDF}>
              Confirmar Agendamento
            </Button>
          </div>
        </Container>
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

"use client";

import Pagina from "@/components/Pagina";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Col, Container, Image, Row, Card, Button } from "react-bootstrap";
import { FaUsers, FaRegBuilding, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [orgaos, setOrgaos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cadastros, setCadastros] = useState(0); // Agora é um número, não um array

  useEffect(() => {
    // Carregar dados do localStorage
    setOrgaos(JSON.parse(localStorage.getItem("orgaos")) || []);
    setFuncionarios(JSON.parse(localStorage.getItem("funcionarios")) || []);
    setCadastros(JSON.parse(localStorage.getItem("clientes"))?.length || 0); // Contar o número de cadastros
  }, []);

  const data = {
    labels: ["Órgãos", "Funcionários", "Cadastros"], // Adicionar "Cadastros" ao gráfico
    datasets: [
      {
        label: "Total",
        data: [orgaos.length, funcionarios.length, cadastros], // Passar os totais corretamente
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Cor para órgãos
          "rgba(255, 99, 132, 0.6)", // Cor para funcionários
          "rgba(153, 102, 255, 0.6)", // Cor para cadastros
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)", // Cor de borda para cadastros
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pagina titulo="Dashboard">
        {/* Botão de Voltar para a Página de Administração */}
        <div className="d-flex justify-content-start mt-3 mb-4">
          <Link href="/admin" passHref>
            <Button variant="secondary">Voltar para Admin</Button>
          </Link>
        </div>

        <h2 className="text-center mb-4">Dashboard de Informações</h2>

        {/* Cards com os totais */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center">
                  <FaRegBuilding size={40} color="#4BC0C0" />
                  <h4 className="mt-3">Órgãos</h4>
                  <p>{orgaos.length} órgãos cadastrados</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center">
                  <FaUsers size={40} color="#FF6384" />
                  <h4 className="mt-3">Funcionários</h4>
                  <p>{funcionarios.length} funcionários registrados</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center">
                  <FaClipboardList size={40} color="#9966FF" />
                  <h4 className="mt-3">Cadastros</h4>
                  <p>{cadastros} pessoas cadastradas para atendimento</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Gráfico */}
        <div style={{ width: "70%", margin: "auto" }}>
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
        </div>

        {/* Total de cadastros - Em destaque */}
        <div className="text-center mt-4">
          <h4>Total de Cadastros</h4>
          <h2 className="display-4 text-info">{cadastros}</h2>
          <p>pessoas se cadastraram para atendimento.</p>
        </div>
      </Pagina>     
    </>
  );
}

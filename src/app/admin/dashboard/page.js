"use client";

import Pagina from "@/components/PaginaLogada";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { FaUsers, FaRegBuilding, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [orgaos, setOrgaos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cadastros, setCadastros] = useState(0);

  useEffect(() => {
    setOrgaos(JSON.parse(localStorage.getItem("orgaos")) || []);
    setFuncionarios(JSON.parse(localStorage.getItem("funcionarios")) || []);
    setCadastros(JSON.parse(localStorage.getItem("clientes"))?.length || 0);
  }, []);

  const data = {
    labels: ["Órgãos", "Funcionários", "Cadastros"],
    datasets: [
      {
        label: "Total",
        data: [orgaos.length, funcionarios.length, cadastros],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <>
      <Pagina titulo="Dashboard">
        <div className="d-flex justify-content-start mt-3 mb-4">
          <Link href="/admin" passHref>
            <Button variant="secondary">Voltar para Admin</Button>
          </Link>
        </div>

        <Container fluid>
          <h2 className="text-center mb-4">Dashboard de Informações</h2>

          <Row className="mb-4 text-center">
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <FaRegBuilding size={40} color="#4BC0C0" />
                  <h5 className="mt-3">Órgãos</h5>
                  <p>{orgaos.length} órgãos cadastrados</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <FaUsers size={40} color="#FF6384" />
                  <h5 className="mt-3">Funcionários</h5>
                  <p>{funcionarios.length} funcionários registrados</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <FaClipboardList size={40} color="#9966FF" />
                  <h5 className="mt-3">Cadastros</h5>
                  <p>{cadastros} pessoas cadastradas para atendimento</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

    
          <Row className="mt-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white text-center">
                  Distribuição de Cadastros
                </Card.Header>
                <Card.Body>
                  <div style={{ width: "70%", margin: "auto" }}>
                    <Doughnut data={data} options={options} height={400} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

     
          <Row className="text-center mt-4">
            <Col>
              <h4>Total de Cadastros</h4>
              <h2 className="display-4 text-info">{cadastros}</h2>
              <p>Pessoas se cadastraram para atendimento.</p>
            </Col>
          </Row>
        </Container>
      </Pagina>
    </>
  );
}

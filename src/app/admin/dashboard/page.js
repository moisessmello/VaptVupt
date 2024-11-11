"use client";

import Pagina from "@/components/Pagina";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
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
          "rgba(75, 192, 192, 0.8)", // Órgãos
          "rgba(255, 99, 132, 0.8)", // Funcionários
          "rgba(153, 102, 255, 0.8)", // Cadastros
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 10, // Destaque ao passar o mouse
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

        <h2 className="text-center mb-4">Dashboard de Informações</h2>

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

        <div style={{ width: "70%", margin: "auto" }}>
          <Doughnut data={data} options={options} height={400} />
        </div>

        <div className="text-center mt-4">
          <h4>Total de Cadastros</h4>
          <h2 className="display-4 text-info">{cadastros}</h2>
          <p>pessoas se cadastraram para atendimento.</p>
        </div>
      </Pagina>
    </>
  );
}

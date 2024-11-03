"use client";

import Pagina from "@/components/Pagina";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Col, Container, Image, Row } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [orgaos, setOrgaos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    setOrgaos(JSON.parse(localStorage.getItem("orgaos")) || []);
    setFuncionarios(JSON.parse(localStorage.getItem("funcionarios")) || []);
  }, []);

  const data = {
    labels: ["Órgãos", "Funcionários"],
    datasets: [
      {
        label: "Total",
        data: [orgaos.length, funcionarios.length],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <Pagina titulo="Dashboard">
      <h2 className="text-center mb-4">Dashboard de Informações</h2>
      <div style={{ width: "50%", margin: "auto" }}>
        <Bar data={data} options={{ responsive: true }} />
      </div>
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

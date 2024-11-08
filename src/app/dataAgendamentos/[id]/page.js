"use client";

import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, Col, Container, Row, Modal, Image } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/navigation";
import ptBR from "date-fns/locale/pt-BR";
import { v4 } from "uuid";

export default function Page({ params }) {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDateClick = (arg) => {
    setDataSelecionada(arg.date);
    setShowModal(true);
  };

  const vaptvupt = JSON.parse(localStorage.getItem("vaptvupt")) || []
  const vaptvuptBuscado = vaptvupt.find(item => item.id == params.id)
  let dataAgendamentos = JSON.parse(localStorage.getItem("dataAgendamentos")) || [];

function salvarAgendamento() {
  if (dataSelecionada && horarioSelecionado) {
    const novoEvento = {
      id: v4(),
      hora: horarioSelecionado,
      start: dataSelecionada,
      vaptvupt: vaptvuptBuscado
    };

    // Verifica se dataAgendamentos é um array
    if (!Array.isArray(dataAgendamentos)) {
      console.error("dataAgendamentos não é um array. Reinicializando como um array vazio.");
      dataAgendamentos = []; // Reinicializa como um array vazio
    }

    // Adiciona o novo evento
    dataAgendamentos.push(novoEvento);
    
    // Armazena novamente no localStorage
    localStorage.setItem("dataAgendamentos", JSON.stringify(dataAgendamentos));
    setShowModal(false);
    alert("Agendamento salvo com sucesso!");
    router.push(`/clientes/${novoEvento.id}`)

  } else {
    alert("Por favor, selecione uma data e horário.");
  }
}

  const handleVoltar = () => {
    router.push('../vaptvupt/form/id');
  };

  const handleLimpar = () => {
    setDataSelecionada(null);
    setHorarioSelecionado("");
    setEventos([]);
    localStorage.removeItem("vaptvupt");
  };

  const handleAvancar = () => {
    router.push('/clientes');
  };

  return (
    <>
      <Pagina titulo="Agendar Data e Hora">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={12}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={ptBR}
                dateClick={handleDateClick}
                selectable
                height="auto"

              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col md={3}>
              <Button variant="secondary" onClick={handleVoltar}>
                Voltar
              </Button>
            </Col>
            {/* <Col md={3}>
              <Button variant="warning" onClick={handleLimpar}>
                Limpar
              </Button>
            </Col> */}
                      </Row>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione o Horário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              className="form-control"
              value={horarioSelecionado}
              onChange={(e) => setHorarioSelecionado(e.target.value)}
            >
              <option value="">Selecione o horário</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={salvarAgendamento}>
              Confirmar Agendamento
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

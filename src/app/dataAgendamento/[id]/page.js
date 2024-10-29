"use client";


import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Image, } from "react-bootstrap";
import ptBR from "date-fns/locale/pt-BR";
import { useRouter } from "next/navigation";


const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function Page({ params }) {
  const router = useRouter(); // Hook para navegação
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [showModal, setShowModal] = useState(false);
  const agendamentos = JSON.parse(localStorage.getItem("vaptvupt"));
  const [eventos, setEventos] = useState([]);

  const handleSlotSelect = ({ start }) => {
    setDataSelecionada(start);
    setShowModal(true);
  };
  function salvarAgendamento() {
    if (dataSelecionada && horarioSelecionado) {
      const novoEvento = {
        title: `Agendado para ${horarioSelecionado}`,
        start: dataSelecionada,
        end: dataSelecionada,
      };
      setEventos([...eventos, novoEvento]);
      localStorage.setItem("vaptvupt", JSON.stringify([...eventos, novoEvento]));
      setShowModal(false);
      alert("Agendamento salvo com sucesso!");
    } else {
      alert("Por favor, selecione uma data e horário.");
    }
  }

  // Funções para os botões
  const handleVoltar = () => {
    router.push('../vaptvupt/form/id'); // Altere '/outra-pagina' para a rota desejada
  };
  const handleLimpar = () => {
    setDataSelecionada(null);
    setHorarioSelecionado("");
    setEventos([]); // Limpa todos os eventos do calendário
    setShowModal(false); // Fecha o modal, se aberto
  };

  const handleAvancar = () => {
    router.push('/cliente'); // Altere para a rota da próxima página
  };


  return (
    <>
      <Pagina titulo="Agendar Data e Hora">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={12}>
              <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                selectable
                culture="pt-BR" // Configura o calendário para o português do Brasil
                style={{ height: 500, margin: "50px" }}
                onSelectSlot={handleSlotSelect}
              />
            </Col>
          </Row>
          {/* Botões de navegação */}
          <Row className="justify-content-center mt-3">
            <Col md={3}>
              <Button variant="secondary" onClick={handleVoltar}>
                Voltar
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="warning" onClick={handleLimpar}>
                Limpar
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="primary" onClick={handleAvancar}>
                Avançar
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Modal para Seleção de Horário */}
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

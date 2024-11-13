import Link from "next/link";
import { useEffect } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function PaginaLogada(props) {
  useEffect(() => {
    document.body.style.backgroundColor = "#f0f8ff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#f0f0f0" }}>
        {" "}
        {/* Cor de fundo cinza claro */}
        <Container>
          <Navbar.Brand href="">
            <img
              src="https://vaptvupt.go.gov.br/assets/externo/img/logo-vapt-vupt.png"
              alt="VaptVupt"
              className="d-inline-block align-top"
              style={{ width: "100px", height: "40px" }} // Ajuste o tamanho conforme necessário
            />
          </Navbar.Brand>

          
          <Link href="/vaptvupt" passHref>
            <button
              style={{
                backgroundColor: "#0059b3",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </Link>
        </Container>
      </Navbar>

      <div className="bg-secondary text-white text-center p-3">
        <h1>{props.titulo}</h1>
      </div>

      <Container>{props.children}</Container>
    </>
  );
}

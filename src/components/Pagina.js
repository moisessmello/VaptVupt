import { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {
  useEffect(() => {
    document.body.style.backgroundColor = "#f0f8ff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#f0f0f0' }}> {/* Cor de fundo cinza claro */}
        <Container>
          <Navbar.Brand href="/poupatempo">
            <img
              src="https://vaptvupt.go.gov.br/assets/externo/img/logo-vapt-vupt.png"
              alt="Poupa Tempo"
              className="d-inline-block align-top"
              style={{ width: "100px", height: "40px" }} // Ajuste o tamanho conforme necessário
            />
          </Navbar.Brand>

          <Nav className="me-auto">
            <NavDropdown title="Serviços" id="basic-nav-dropdown">
              <NavDropdown.Item href="/aeroportos">Detran</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/empresas">Saneago</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/voos">Receita Federal</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/passagens">Equatorial</NavDropdown.Item>
              
              
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-secondary text-white text-center p-3">
        <h1>{props.titulo}</h1>
      </div>

      <Container>{props.children}</Container>
    </>
  );
}

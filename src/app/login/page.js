"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export default function Page() {
  const router = useRouter();

  function login(dados) {
    if (dados.usuario === "admin" && dados.senha === "admin") {
      router.push("/admin");
    } else {
      alert("Usuário ou senha incorretos");
    }
  }

  return (
    <Pagina titulo="Acesso Restrito">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('https://valparaisodegoias.go.gov.br/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-23-at-10.57.28.jpeg')", // Substitua pelo caminho da sua imagem
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1, // Ajuste a opacidade conforme necessário
          zIndex: -1,
        }}
      ></div>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Formik
            initialValues={{
              usuario: "",
              senha: "",
            }}
            onSubmit={(values) => login(values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group className="mb-3 mt-3" controlId="usuario">
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    name="usuario"
                    value={values.usuario}
                    onChange={handleChange("usuario")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="senha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="senha"
                    value={values.senha}
                    onChange={handleChange("senha")}
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#0059b3",
                      borderColor: "#0059b3",
                      color: "#ffffff",
                    }}
                  >
                    Efetuar login <FaCheck />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Pagina>
  );
}

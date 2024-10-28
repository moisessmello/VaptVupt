"use client";

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/app/page";

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
//import { v4 } from "uuid";

export default function Page({ params }) {
  const route = useRouter();

  const vaptvup = JSON.parse(localStorage.getItem("vaptvup")) || [];
  const dados = vaptvup.find((item) => item.id == params.id);
  const unidades = dados || {
    nome: "",
    sigla: "",
    uf: "",
    cidade: "",
    pais: "Brasil",
  };

  const [paises, setPaises] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [camposBrasil, setCamposBrasil] = useState(false);

  useEffect(() => {
    apiLocalidade.get(`paises`).then((resultado) => {
      setPaises(resultado.data);
    });
  }, []);

  useEffect(() => {
    apiLocalidade.get(`estados?orderBy=nome`).then((resultado) => {
      setUfs(resultado.data);
    });
  }, []);

  useEffect(() => {
    apiLocalidade.get(`estados//municipios`).then((resultado) => {
      setCidades(resultado.data);
    });
  }, []);

  function salvar(dados) {
    if (vaptvupt.id) {
      Object.assign(vaptvup, dados);
    } else {
      dados.id = v4();
      vaptvup.push(dados);
    }

    localStorage.setItem("vaptvup", JSON.stringify(vaptvup));
    return route.push("/vaptvup");
  }

  return (
    <>
      <Pagina titulo="Poupa Tempo">
        <Formik
          initialValues={vaptvup}
          onSubmit={(values) => salvar(values)}
          validationSchema={vaptvupValidator}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => {
            useEffect(() => {
              setCamposBrasil(values.pais == "Brasil");
            }, [values.pais]);

            useEffect(() => {
              apiLocalidade
                .get(`estados/${values.uf}/municipios`)
                .then((resultado) => {
                  setCidades(resultado.data);
                });
            }, [values.uf]);

            return (
              <Form className="mt-3">
                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do aeroporto"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange("nome")}
                    isInvalid={!!errors.nome && touched.nome}
                  />
                  <ErrorMessage
                    name="nome"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sigla">
                  <Form.Label>Sigla</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a sigla aeroporto"
                    name="sigla"
                    value={values.sigla}
                    onChange={handleChange("sigla")}
                    isInvalid={!!errors.sigla && touched.sigla}
                  />
                  <ErrorMessage
                    name="sigla"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pais">
                  <Form.Label>País</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="pais"
                    value={values.pais}
                    onChange={handleChange("pais")}
                    isInvalid={!!errors.pais && touched.pais}
                  >
                    <option value={""}>Selecione</option>
                    {paises.map((item) => (
                      <option key={item.id} value={item.nome}>
                        {" "}
                        {item.nome}{" "}
                      </option>
                    ))}
                  </Form.Select>
                  <ErrorMessage
                    name="pais"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                {camposBrasil && (
                  <>
                    <Form.Group className="mb-3" controlId="uf">
                      <Form.Label>UF</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="uf"
                        value={values.uf}
                        onChange={handleChange("uf")}
                        isInvalid={!!errors.uf && touched.uf}
                      >
                        <option value={""}>Selecione</option>
                        {ufs.map((item) => (
                          <option key={item.id} value={item.sigla}>
                            {item.sigla} - {item.nome}
                          </option>
                        ))}
                      </Form.Select>
                      <ErrorMessage
                        name="uf"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange("cidade")}
                        isInvalid={!!errors.cidade && touched.cidade}
                      >
                        <option value={""}>Selecione</option>
                        {cidades.map((item) => (
                          <option key={item.nome} value={item.nome}>
                            {" "}
                            {item.nome}{" "}
                          </option>
                        ))}
                      </Form.Select>
                      <ErrorMessage
                        name="cidade"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </>
                )}

                <div className="text-center">
                  <Link href={"/vaptvup"} className="btn btn-primary">
                    <FaAngleLeft />
                    Voltar
                  </Link>
                  <Button
                    variant="success"
                    className="ms-1"
                    onClick={handleSubmit}
                  >
                    <FaCheck />
                    Salvar
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Pagina>
      <footer className="bg-dark text-white text-center p-4 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHe9NbtpQ6e3rBZU0eg8_kJd68C2lah9BWA&s"
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
                Email: contato@vaptvup.com
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <p>&copy; 2024 Poupa Tempo - Todos os direitos reservados</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

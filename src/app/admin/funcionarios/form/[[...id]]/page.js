"use client";

import { FuncionariosValidator } from "@/app/validators/FuncionariosValidator";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
  const route = useRouter();

  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  const dados = funcionarios.find(item => item.id == params.id);
  const funcionario = dados || { nome: "", cpf: "", data_nascimento: "", genero: "", cargo: "", telefone: ""};
  
  function salvar(dados) {
    if (funcionario.id) {
      Object.assign(funcionario, dados);
    } else {
      dados.id = v4();
      funcionarios.push(dados);
    }

    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    return route.push(`/admin/funcionarios`);
  }

  return (
    <Pagina titulo="Funcionários">
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={8}>
            <h2 className="text-center mt-4">Dados Funcionários</h2>
            <Formik
              initialValues={{
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                data_nascimento: funcionario.data_nascimento,
                genero: funcionario.genero,
                cargo: funcionario.cargo,
                telefone: funcionario.telefone,
              }}
              validationSchema={FuncionariosValidator}
              onSubmit={(values) => salvar(values)}
            >
              {({ values, handleChange, handleSubmit, errors }) => {
                values.cpf = mask(values.cpf, "999.999.999-99");
                values.telefone = mask(values.telefone, "(99) 99999-9999");
                values.data_nascimento = mask(
                  values.data_nascimento,
                  "99/99/9999"
                );

                return (
                  <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange("nome")}
                        isInvalid={!!errors.nome}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nome}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cpf">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange("cpf")}
                        isInvalid={!!errors.cpf}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cpf}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="data_nascimento">
                      <Form.Label>Data de Nascimento</Form.Label>
                      <Form.Control
                        type="text"
                        name="data_nascimento"
                        value={values.data_nascimento}
                        onChange={(e) => {
                          const maskedValue = mask(
                            e.target.value,
                            "99/99/9999"
                          );
                          handleChange("data_nascimento")({
                            target: {
                              name: "data_nascimento",
                              value: maskedValue,
                            },
                          });
                        }}
                        isInvalid={!!errors.data_nascimento}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.data_nascimento}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="genero">
                      <Form.Label>Gênero</Form.Label>
                      <Form.Select
                        name="genero"
                        value={values.genero}
                        onChange={handleChange("genero")}
                        isInvalid={!!errors.genero}
                      >
                        <option value="">Selecione</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Prefiro não dizer">
                          Prefiro não dizer
                        </option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.genero}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cargo">
                      <Form.Label>Cargo</Form.Label>
                      <Form.Select
                        name="cargo"
                        value={values.cargo}
                        onChange={handleChange("cargo")}
                        isInvalid={!!errors.cargo}
                      >
                        <option value="">Selecione</option>
                        <option value="Atendente do Detran">Atendente do Detran</option>
                        <option value="Atendente da Saneago">Atendente da Saneago</option>
                        <option value="Atendente da Receita Federal">Atendente da Receita Federal</option>
                        <option value="Atendente da Equatorial">Atendente da Equatorial</option>
                        <option value="Recepcionista">Recepcionista</option>
                        <option value="Serviços Gerais">Serviços Gerais</option>
                        <option value="Supervisor">Supervisor</option>
                        
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.cargo}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telefone">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="text"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleChange("telefone")}
                        isInvalid={!!errors.telefone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefone}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center mt-4">
                      <Link
                        href="/admin/funcionarios"
                        className="btn btn-danger me-3"
                      >
                        <MdOutlineArrowBack /> Voltar
                      </Link>
                      <Button type="submit" variant="success">
                        Salvar <FaCheck />
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Pagina>
  );
}

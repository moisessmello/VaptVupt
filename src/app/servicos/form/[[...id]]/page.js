"use client";

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const servicos = JSON.parse(localStorage.getItem("servicos")) || [];
    const dados = servicos.find((item) => item.id == params.id);
    const servico = dados || { nome: "", descricao: "", valor: "" };

    function salvar(dados) {
        if (servicos.id) {
            Object.assign(servicos, dados);
        } else {
            dados.id = v4();
            servicos.push(dados);
        }
        // Salvar o nome do órgão no Local Storage
        localStorage.setItem("selectedOrgao", dados.nome); // Substitua "Detran" pelo valor dinâmico

        localStorage.setItem("servicos", JSON.stringify(servicos));
        return route.push("/servicos");
    }

    return (
        <Pagina titulo="Serviços">
            <Formik initialValues={servicos} onSubmit={(values) => salvar(values)}>
                {({ values,
                    handleChange,
                    handleSubmit
                }) => {

                    return (
                        <Form className="mt-5">
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange("nome")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descricao"
                                    value={values.descricao}
                                    onChange={handleChange("descricao")}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="valor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="valor"
                                    value={values.valor}
                                    onChange={handleChange("valor")}
                                />
                            </Form.Group>

                            <div className="text-center mt-4">
                                <Link
                                    href="/dataAgendamentos/id"
                                    className="btn btn-danger me-3"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                                <Button type="submit" variant="success" onClick={handleSubmit}>
                                    Salvar <FaCheck />
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}

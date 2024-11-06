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
    const dados = servicos.find(item => item.id == params.id);
    const servico = dados || { nome: "", descricao: "", orgao: "", valor: "" };

    const orgaos = JSON.parse(localStorage.getItem("orgaos")) || [];

    function salvar(dados) {

        if (servico.id) {
          Object.assign(servico, dados)
        } else {
          dados.id = v4()
          servicos.push(dados)
        }
    
        localStorage.setItem('servicos', JSON.stringify(servicos))
        return route.push('/servicos')
      }

    return (
        <Pagina titulo="Serviços">
            <Formik initialValues={servico} onSubmit={values => salvar(values)}>
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

                            <Form.Group className="mb-3" controlId="orgao">
                                <Form.Label>Nome do órgão</Form.Label>
                                <Form.Select
                                    name="orgao"
                                    value={values.orgao} // Usa o valor do Local Storage ou o valor do formulário
                                    onChange={handleChange("orgao")}
                                >
                                    <option value="">Selecione</option>
                                    {orgaos.length > 0 ? ( // Verifica se existem órgãos para mapear
                                        orgaos.map((item) => (
                                            <option key={item.id} value={item.nome}>
                                                {item.nome}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Nenhum órgão disponível</option> // Mensagem se não houver órgãos
                                    )}
                                </Form.Select>
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

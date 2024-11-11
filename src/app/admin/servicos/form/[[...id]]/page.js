"use client";

import { ServicosValidator } from "@/app/validators/ServicosValidator";
import Pagina from "@/components/Pagina";
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
        // Converte valor para número ao salvar
        const valorNumerico = parseFloat(dados.valor.replace(/[R$\s.,]/g, "").replace(",", "."));
        if (!isNaN(valorNumerico)) {
            dados.valor = valorNumerico; // Atualiza o valor para o número sem máscara
        }

        if (servico.id) {
            Object.assign(servico, dados);
        } else {
            dados.id = v4();
            servicos.push(dados);
        }

        localStorage.setItem("servicos", JSON.stringify(servicos));
        route.push('/admin/servicos');
    }

    function handleValorChange(event, setFieldValue) {
        let value = event.target.value.replace(/\D/g, "");
        value = (value / 100).toFixed(2);
        value = value.toString().replace(".", ",");
        value = "R$ " + value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setFieldValue("valor", value);
    }

    return (
        <Pagina titulo="Serviços">
            <Formik
                initialValues={servico}
                validationSchema={ServicosValidator}
                onSubmit={(values) => salvar(values)}
            >
                {({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
                    <Form className="mt-5" onSubmit={handleSubmit}>
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

                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange("descricao")}
                                isInvalid={!!errors.descricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.descricao}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="orgao">
                            <Form.Label>Nome do órgão</Form.Label>
                            <Form.Select
                                name="orgao"
                                value={values.orgao}
                                onChange={handleChange("orgao")}
                                isInvalid={!!errors.orgao}
                            >
                                <option value="">Selecione</option>
                                {orgaos.length > 0 ? (
                                    orgaos.map((item) => (
                                        <option key={item.id} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nenhum órgão disponível</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.orgao}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                name="valor"
                                value={values.valor}
                                onChange={(e) => handleValorChange(e, setFieldValue)}
                                isInvalid={!!errors.valor}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.valor}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center mt-4">
                            <Link href="/admin/servicos" className="btn btn-danger me-3">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                            <Button type="submit" variant="success">
                                Salvar <FaCheck />
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}

"use client";

import Pagina from "@/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

  const route = useRouter()

  const orgaos = JSON.parse(localStorage.getItem('orgaos')) || []
  const dados = orgaos.find(item => item.id == params.id)
  const orgao = dados || { nome: '', cnpj: '', telefone: '', email: '' }

  

  

  function salvar(dados) {

    if (orgao.id) {
      Object.assign(orgao, dados)
    } else {
      dados.id = v4()
      orgaos.push(dados)
    }

    localStorage.setItem('orgaos', JSON.stringify(orgaos))
    return route.push('/orgao')
  }

  return (
    <Pagina titulo="Órgao">

      <Formik
        initialValues={orgao}
        onSubmit={values => salvar(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => {

          

          return (

            <Form>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange('nome')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cnpj">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  name="cnpj"
                  value={values.cnpj}
                  onChange={handleChange('cnpj')}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={values.telefone}
                  onChange={handleChange("telefone")}
                />
              </Form.Group>
              
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </Form.Group>
           

              <div className="text-center mt-4">
                <Link href="/dataAgendamento/id" className="btn btn-danger me-3">
                  <MdOutlineArrowBack /> Voltar
                </Link>
                <Button type="submit" variant="success" onClick={handleSubmit}>
                  Salvar <FaCheck />
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
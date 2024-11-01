'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {

  const [orgaos, setOrgaos] = useState([])

  useEffect(() => {
    setOrgaos(JSON.parse(localStorage.getItem('orgaos')) || [])
  }, [])

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = orgaos.filter(item => item.id != id)
      localStorage.setItem('orgaos', JSON.stringify(dados))
      setOrgaos(dados)
    }
  }

  return (
    <Pagina titulo="Órgão">

      <Link
        href="/orgao/form"
        className="btn btn-primary mb-3"
      >
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {orgaos.map((item, i) => (
            <tr key={item.id}>
              <td>
                <Link href={`/orgao/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td>{item.nome}</td>
              <td>{item.cnpj}</td>
              <td>{item.telefone}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {

    const [funcionarios, setFuncionarios] = useState([])

    useEffect(() => {
        setFuncionarios(JSON.parse(localStorage.getItem('funcionarios')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = funcionarios.filter(item => item.id != id)
            localStorage.setItem('funcionarios', JSON.stringify(dados))
            setFuncionarios(dados)
        }
    }

    return (
        <Pagina titulo="Funcionários">

            <Link
                href="/funcionario/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Gênero</th>
                        <th>Cargo</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/funcionarios/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.cpf}</td>
                            <td>{item.genero}</td>
                            <td>{item.cargo}</td>
                            <td>{item.telefone}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
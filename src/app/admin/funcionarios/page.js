"use client";

import Pagina from "@/components/PaginaLogada";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const dadosFuncionarios =
      JSON.parse(localStorage.getItem("funcionarios")) || [];
    setFuncionarios(dadosFuncionarios);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = funcionarios.filter((item) => item.id !== id);
      localStorage.setItem("funcionarios", JSON.stringify(dados));
      setFuncionarios(dados);
    }
  }

  return (
    <Pagina titulo="Funcionários">
      <div className="d-flex justify-content-start mt-3 mb-4">
        <Link href="/admin" passHref>
          <Button variant="secondary">Voltar para Admin</Button>
        </Link>
      </div>

      <Table
        striped
        hover
        className="mt-3"
        style={{
          borderRadius: "15px",
          border: "2px solid #007bff",
          boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
          overflow: "hidden",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "2px solid #007bff" }}>Nome</th>
            <th style={{ border: "2px solid #007bff" }}>CPF</th>
            <th style={{ border: "2px solid #007bff" }}>Data de Nascimento</th>
            <th style={{ border: "2px solid #007bff" }}>Gênero</th>
            <th style={{ border: "2px solid #007bff" }}>Cargo</th>
            <th style={{ border: "2px solid #007bff" }}>Telefone</th>
            <th style={{ border: "2px solid #007bff" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.nome}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.cpf}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.data_nascimento}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.genero}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.cargo}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.telefone}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                <Link href={`/admin/funcionarios/form/${item.id}`} passHref>
                  <FaRegEdit title="Editar" className="text-primary mx-2" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Link href="/admin/funcionarios/form" passHref>
          <Button variant="primary">
            <FaPlusCircle /> Novo
          </Button>
        </Link>
      </div>
    </Pagina>
  );
}

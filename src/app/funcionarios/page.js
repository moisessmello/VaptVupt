"use client";

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    setFuncionarios(JSON.parse(localStorage.getItem("funcionarios")) || []);
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
      <Table
        striped
        hover
        className="mt-5"
        style={{
          borderRadius: "15px", // Arredondamento dos cantos
          border: "2px solid #007bff", // Borda sólida azul
          boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)", // Sombra para dar profundidade
          overflow: "hidden", // Para que o arredondamento funcione
          borderCollapse: "collapse", // Junte bordas
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "2px solid #007bff" }}>Ações</th>
            <th style={{ border: "2px solid #007bff" }}>Nome</th>
            <th style={{ border: "2px solid #007bff" }}>CPF</th>
            <th style={{ border: "2px solid #007bff" }}>Gênero</th>
            <th style={{ border: "2px solid #007bff" }}>Cargo</th>
            <th style={{ border: "2px solid #007bff" }}>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {" "}
                {/* Borda externa da célula */}
                <Link href={`/funcionarios/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.nome}
              </td>{" "}
              {/* Borda externa da célula */}
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.cpf}
              </td>{" "}
              {/* Borda externa da célula */}
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.genero}
              </td>{" "}
              {/* Borda externa da célula */}
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.cargo}
              </td>{" "}
              {/* Borda externa da célula */}
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.telefone}
              </td>{" "}
              {/* Borda externa da célula */}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end mt-3">
        <Link href="/funcionario/form" className="btn btn-primary">
          <FaPlusCircle /> Novo
        </Link>
      </div>
    </Pagina>
  );
}

"use client";

import Pagina from "@/components/PaginaLogada";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    const dadosOrgaos = JSON.parse(localStorage.getItem("orgaos")) || [];
    setOrgaos(dadosOrgaos);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = orgaos.filter((item) => item.id !== id);
      localStorage.setItem("orgaos", JSON.stringify(dados));
      setOrgaos(dados);
    }
  }

  return (
    <Pagina titulo="Órgão">
  
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
            <th style={{ border: "2px solid #007bff" }}>CNPJ</th>
            <th style={{ border: "2px solid #007bff" }}>Telefone</th>
            <th style={{ border: "2px solid #007bff" }}>Email</th>
            <th style={{ border: "2px solid #007bff" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orgaos.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.nome}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.cnpj}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.telefone}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                {item.email}
              </td>
              <td style={{ border: "1px solid #007bff", padding: "10px" }}>
                <Link href={`/admin/orgaos/form/${item.id}`} passHref>
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
        <Link href="/admin/orgaos/form" passHref>
          <Button variant="primary">
            <FaPlusCircle /> Novo
          </Button>
        </Link>
      </div>
    </Pagina>
  );
}

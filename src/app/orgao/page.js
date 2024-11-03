"use client";

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    setOrgaos(JSON.parse(localStorage.getItem('orgaos')) || []);
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = orgaos.filter(item => item.id !== id);
      localStorage.setItem('orgaos', JSON.stringify(dados));
      setOrgaos(dados);
    }
  }

  return (
    <Pagina titulo="Órgão">
      <Table
        striped
        hover
        className="mt-5"
        style={{
          borderRadius: '15px', // Arredondamento dos cantos
          border: '2px solid #007bff', // Borda sólida azul
          boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)', // Sombra para dar profundidade
          overflow: 'hidden', // Para que o arredondamento funcione
          borderCollapse: 'collapse', // Junte bordas
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '2px solid #007bff' }}>#</th>
            <th style={{ border: '2px solid #007bff' }}>Nome</th>
            <th style={{ border: '2px solid #007bff' }}>CNPJ</th>
            <th style={{ border: '2px solid #007bff' }}>Telefone</th>
            <th style={{ border: '2px solid #007bff' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {orgaos.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #007bff', padding: '10px' }}> {/* Borda externa da célula */}
                <Link href={`/orgao/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.nome}</td> {/* Borda externa da célula */}
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.cnpj}</td> {/* Borda externa da célula */}
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.telefone}</td> {/* Borda externa da célula */}
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.email}</td> {/* Borda externa da célula */}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Link href="/orgao/form" className="btn btn-primary">
          <FaPlusCircle /> Novo
        </Link>
      </div>
    </Pagina>
  );
}

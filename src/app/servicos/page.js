"use client";

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const dadosServicos = JSON.parse(localStorage.getItem("servicos")) || [];
    setServicos(dadosServicos);
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = servicos.filter(item => item.id !== id);
      localStorage.setItem('servicos', JSON.stringify(dados));
      setServicos(dados);
    }
  }

  return (
    <Pagina titulo="Serviços">
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
            <th style={{ border: '2px solid #007bff' }}>Ações</th>
            <th style={{ border: '2px solid #007bff' }}>Nome</th>
            <th style={{ border: '2px solid #007bff' }}>Descrição</th>
            <th style={{ border: '2px solid #007bff' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #007bff', padding: '10px' }}> {/* Borda externa da célula */}
                <Link href={`/servicos/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.nome}</td> {/* Borda externa da célula */}
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.descricao}</td> {/* Borda externa da célula */}
              <td style={{ border: '1px solid #007bff', padding: '10px' }}>{item.valor}</td> {/* Borda externa da célula */}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Link href="/servicos/form" className="btn btn-primary">
          <FaPlusCircle /> Novo
        </Link>
      </div>
    </Pagina>
  );
}

"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";



export default function Home() {
  
  const [showTooltip, setShowTooltip] = useState(false);
  
  
  return (
    <div className="bg-light vh-100 d-flex flex-column justify-content-center align-items-center">
      <a 
        href="/vaptvupt"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ textDecoration: 'none' }} // Remove o sublinhado do link
      >
        <img 
          src="https://fetracom.org.br/site2023/wp-content/uploads/2023/06/VaptVupt.jpg" 
          alt="Agendamentos" 
          className="rounded" 
          style={{ width: '500px', height: '350px', display: 'block' }} // Use display block
        />
      </a>
      {showTooltip && (
        <div className="mt-3 text-center" style={{ color: '#333' }}>
          Clique para mais informações sobre agendamentos
        </div>
      )}
    </div>
  );
}

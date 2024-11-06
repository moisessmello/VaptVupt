'use client'


import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export default function Page() {
    const router = useRouter();

    function login(dados){
        if(dados.usuario == 'admin' && dados.senha == 'admin'){
            router.push('/admin');
        }
    }
    return (
        <Pagina titulo="Título">
        <Formik
                initialValues={{
                  usuario: "",
                  senha: "",
                }}
                onSubmit={(values) => login(values)}
              >
                {({ values, handleChange, handleSubmit }) => {


                  return (
                    <Form className="w-100" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="usuario">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                          type="text"
                          name="usuario"
                          value={values.usuario}
                          onChange={handleChange("usuario")}
                        />
                      </Form.Group>
                     

                      <Form.Group className="mb-3" controlId="senha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="senha"
                          value={values.senha}
                          onChange={handleChange("senha")}
                        />
                      </Form.Group>

                      <div className="text-center mt-4">
                       
                        <Button type="submit" variant="success" onClick={handleSubmit}>
                          Entrar <FaCheck />
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
        </Pagina>
    )
}



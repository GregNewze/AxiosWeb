"use client";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebaseConfig"; 
import { useRouter } from "next/navigation"; 

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");  
  const router = useRouter();  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth(app);

      //Validação dos campos ai pra quando o caba n escrever direito
      if (!email || !password) {
        setError("Preencha corretamente os dados.");
        return;
      }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário registrado:", userCredential.user);
      router.push("/coletadedados/data");//era pra redirecionar pra pagina de coleta de dados(nao consegui fazer)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);  
      } else {
        setError("Ocorreu um erro desconhecido");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Registre-se</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>} {/* Exibe o erro se tiver houver */}
      <button type="submit">Criar conta</button>
    </form>
  );
};

export default Register;

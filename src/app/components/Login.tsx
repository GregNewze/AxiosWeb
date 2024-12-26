"use client";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebaseConfig";
import { useRouter } from "next/navigation";  

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");  
  const [isClient, setIsClient] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); //era pra mostrar senha que eu ainda não implementei
  const router = useRouter();

  
  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isClient) return; 

    const auth = getAuth(app);

    if (!email || !password) {
      setError("Preencha corretamente os dados.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);
      router.push("/coletadedados/data"); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Para quando o jumento errar os dados e aparecer a mensagem de erro
        if (error.message.includes("auth/invalid-credential")) {
          setError("As credenciais fornecidas são inválidas. Verifique seu email e senha.");
        } else if (error.message.includes("auth/invalid-email")) {
          setError("O email fornecido é inválido.");
        } else if (error.message.includes("auth/user-not-found")) {
          setError("Usuário não encontrado. Verifique o email.");
        } else if (error.message.includes("auth/wrong-password")) {
          setError("Senha incorreta. Tente novamente.");
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  if (!isClient) {
    return null; // Evita a renderização até que o componente seja montado no cliente
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Faça Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
     
        <input
          type={showPassword ? "text" : "password"} // Alterna entre senha visível e oculta
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
  
      {error && <p className="text-red-500">{error}</p>}  {/* Exibe erro se houver */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

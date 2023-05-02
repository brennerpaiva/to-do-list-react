import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebaseConection"
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        alert("conta criada com sucesso")
        navigate('/admin', {replace: true})
      })
      .catch((error) => {
        console.log(error)
      })

    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <div className="home-container">
      <section id="login">
        <div id="imagem"></div>
        <div id="formulario">
          <h1>Register</h1>
          <p>
            Seja bem-vindo(a) novamente. Faça login para acessar sua conta e
            poder fazer as configurações no seu ambiente.
          </p>

          <form onSubmit={handleRegister}>
            <div className="campo">
              <i className="material-icons">person</i>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Login</label>
            </div>

            <div className="campo">
              <i className="material-icons">vpn_key</i>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Senha</label>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
          <Link to="/"className="button-link">Já possui uma conta?</Link>
        </div>
      </section>
    </div>
  );
}

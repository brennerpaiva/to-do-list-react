import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConection"
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true})
      })
      .catch((error) => {
        console.log('erro ao fazer login')
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
          <h1>Login</h1>
          <p>
            Seja bem-vindo(a) novamente. Faça login para acessar sua conta e
            poder fazer as configurações no seu ambiente.
          </p>

          <form onSubmit={handleLogin}>
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
            <button type="submit">Acessar</button>
            <Link to="/register" className="button-link">
              Não possui uma conta? Cadastre-se
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}


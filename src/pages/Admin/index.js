import { useState } from "react";
import "./admin.css";

import { auth } from '../../firebaseConection'
import { signOut } from  'firebase/auth'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    alert("clicou");
    console.log(tarefaInput);
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form onSubmit={handleRegister}>
        <textarea
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
          placeholder="Digite sua tarefa..."
        />
        <button type="submit" className="btn-register">Registar Tarefa</button>
      </form>

      <article className="list">
        <p>Estudar JavaScript e ReactJS</p>

        <div>
            <button>Editar</button>
            <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>Sair</button>
    </div>
  );
}

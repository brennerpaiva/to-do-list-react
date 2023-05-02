import { useState } from "react";
import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    alert("clicou");
    console.log(tarefaInput);
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
        <button type="submit">Registar Tarefa</button>
      </form>

      <article className="list">
        <p>Estudar JavaScript e ReactJS</p>

        <div>
            <button>Editar</button>
            <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button className="btn-logout">Sair</button>
    </div>
  );
}

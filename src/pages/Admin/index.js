import { useState, useEffect } from "react";

import { auth, db } from "../../firebaseConection";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState("");

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));
      console.log(user);

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            })
          })

          setTarefas(lista);
        })
      }
    }
    
    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === "") {
      alert("digite uma tarefa!");
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        console.log("tarefa Registrada com sucesso");
        setTarefaInput("");
      })
      .catch((error) => {
        console.log("erro ao registrar" + error);
      });
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
        <button type="submit" className="btn-register">
          Registar Tarefa
        </button>
      </form>

      {tarefas.map((item) => {
        return(
        <article className="list" key={item.id}>
          <p>{item.tarefa}</p>

          <div>
            <button>Editar</button>
            <button className="btn-delete">Concluir</button>
          </div>
        </article>
      )})}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

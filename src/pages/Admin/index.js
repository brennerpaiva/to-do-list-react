import { useState, useEffect } from "react";
import "./admin.css";
import { auth, db } from "../../firebaseConection";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";


export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          setTarefas(lista);
        });
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

    if(edit?.id) {
      handleUpdateTarefa();
      return
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

  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  async function editTarefa(item) {
      setTarefaInput(item.tarefa)
      setEdit(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    .then(() => {
      console.log("tarefa atualizada")
      setTarefaInput("")
      setEdit({})
    })
    .catch(() => {
      console.log('erro ao atualizar')
      setTarefaInput("");
      setEdit({});
    })
  }

  return (
    <div className="admin-container">
      {Object.keys(edit).length > 0 ? (
        <span>Edite sua tarefa</span>
      ) : (
        <span>Adcione sua tarefa</span>
      )}

      <form className="form-tarefas" onSubmit={handleRegister}>
        <input
          className="input-tarefa"
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
          placeholder="Digite sua tarefa..."
        />

        {Object.keys(edit).length > 0 ? (
          <button type="submit" className="btn-atualizar">
            Atualizar tarefa
          </button>
        ) : (
          <button type="submit" className="btn-register">
            Registrar tarefa
          </button>
        )}
      </form>
      <span>Quadro de tarefas</span>
      {tarefas.map((item) => {
        return (
          <article className="list" key={item.id}>
            <p>{item.tarefa}</p>
            <div className="icons">
              <button onClick={() => editTarefa(item)}>
                <ion-icon name="create-outline"></ion-icon>
              </button>
              <button
                className="btn-concluir"
                onClick={() => deleteTarefa(item.id)}
              >
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </button>
            </div>
          </article>
        );
      })}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

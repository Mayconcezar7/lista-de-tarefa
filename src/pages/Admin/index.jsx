import "./Admin.css"
import { useState, useEffect } from "react"
import { auth, db } from "../../firebase/fireBaseConection"
import { addDoc, collection, onSnapshot, orderBy, query, where , doc, deleteDoc, updateDoc} from "firebase/firestore"
import { signOut } from "firebase/auth"

const Admin = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState({})

  useEffect(() => {
    async function loadingTask() {

      const userDetail = localStorage.getItem("@detailsUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail)
        

        const taskRef = collection(db, "task")
        const q = query(
          taskRef,
          orderBy("createDate", "desc"),
          where("userUid", "==", data?.id) 
        )

        const unsub = onSnapshot(q, (snapshot) => {
          let list = []

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              task: doc.data().task,
              userUid: doc.data().userUid
            })
          })

          setTasks(list)
        })
      }
    }

    loadingTask()
  }, [])

  async function handlerTask(e) {
    e.preventDefault()

    if (task === "") {
      return alert("Digite alguma tarefa")
    }

    if (edit?.id) {
        
      return handlerUpdateTask()
    }

    try {
      await addDoc(collection(db, "task"), {
        createDate: new Date(),
        task: task,
        userUid: user?.id, 
      })

      setTask("")
    } catch (error) {
      console.log(error)
    }
  }

  async function handlerBack() {
    await signOut(auth)
      .then(() => {
        alert("Conta deslogada")
      })
      .catch((error) => {
        console.log(error)
      })
  }

//concluir tarefa 
  async function deleteTask(id) {

    const taskDeleteRef = doc(db, "task", id)

    await deleteDoc(taskDeleteRef)
    
  }


  function editTask (t) {

    setTask(t.task)
    setEdit(t)

    
    
  } 
  
  async function handlerUpdateTask() {
    const editTaskRef = doc(db, "task" ,edit?.id)

    await updateDoc(editTaskRef,{
      task: task
    })
    .then(()=>{
      setTask("")
      setEdit({})
    })
    .catch(()=>{
      setTask("")
      setEdit({})
      
    })
    
  }
    

  return (
    <div className="container-Admin">

      <div className="container-foms-tasks">

        <form onSubmit={handlerTask} className="container-forms">

          <h2>GERENCIE SEU DIA</h2>
          
          <textarea
            placeholder="Digite aqui a tarefa que deseja adicionar"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {
           Object.keys(edit).length > 0 ? 
          (<button type="submit" id="btn-register-task" style={{backgroundColor: "#f57105"  , border: "1px solid #f57105" , color:"#fff"} }>Atualizar Tarefa</button>)
           :
           ( <button type="submit" id="btn-register-task">Registrar Tarefa</button>)
          }

          <button type="button" onClick={handlerBack} id="btn-back">Sair</button>

        </form>

        <h3 id="title-task">Tarefas</h3>

        <div className="container-tasks">

          {tasks.map((t) => (
            <article className="tasks" key={t.id}>

              <h3 className="name-task">{t.task}</h3>

              <div className="container-btns">

                <button className="btn-update" onClick={()=> editTask(t)}>Editar</button>
                <button className="btn-conclude" onClick={()=> deleteTask(t.id)}>Concluir</button>

              </div>
              
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
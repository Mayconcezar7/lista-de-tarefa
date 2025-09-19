import "./Home.css"
import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import {auth} from "../../firebase/fireBaseConection"
import { signInWithEmailAndPassword } from "firebase/auth"

const Home = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navegate = useNavigate()


  async function handlerSubmit(e) {
    e.preventDefault()
    
    if (email !== "" || password !== "") {
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(()=>{


        navegate("/admin", {replace: true})

      })
      .catch(()=>{
        alert("senha ou email incorreto")
      })
      
    }else{
      alert("preencha os campos")
    }
  }






  return (
    <div className="home-container">

      <div id="text-registerLink">
          <h1>Lista de Tarefas</h1>
          <h4>Otimize o seu tempo com a nossa Lista de Tarefas.</h4>
          <Link to="/register" id="link-register">Cadastra-se aqui</Link>
      </div>


      <div id="info-Login">
        <h2>Login</h2>

        <form id="inputs-container" onSubmit={handlerSubmit}>
          <div className="inpts-label">
            <label>Email:</label>
            <input type="email" placeholder="Digite o seu Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="inpts-label">
            <label>Senha:</label>
            <input type="password" placeholder="Digite sua Senha..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

         
            <button type="submit" id="btn-login">Entrar</button>
          
        </form>
      </div>

    </div>
  )
}

export default Home
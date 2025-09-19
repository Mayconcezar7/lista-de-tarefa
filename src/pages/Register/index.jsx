
import { useState } from "react"
import { Link ,replace,useNavigate} from "react-router-dom"
import {auth} from "../../firebase/fireBaseConection"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navegate = useNavigate()


  async function handlerSubmit(e) {
    e.preventDefault()
    
    if (email !== "" || password !== "") {

      await createUserWithEmailAndPassword(auth, email, password)
      .then(()=>{
          navegate("/admin", {replace: true})
      })
      .catch(()=>{
        console.log("Erro ao fazer cadastro");
        
      })
      
      
      
    }else{
      alert("preencha todos os campos")
    }
  }






  return (
    <div className="home-container">

      <div id="text-registerLink">
          <h1>Transforme suas ideias em ações.</h1>
          <h4>Controle suas atividades, alcance seus objetivos e economize tempo.</h4>
          <Link to="/" id="link-register">Faça Login</Link>
      </div>


      <div id="info-Login">
        <h2>Crie sua conta</h2>

        <form id="inputs-container" onSubmit={handlerSubmit}>
          <div className="inpts-label">
            <label>Email:</label>
            <input type="email" placeholder="Digite o seu Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="inpts-label">
            <label>Senha:</label>
            <input type="password" placeholder="Digite sua Senha..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

         
            <button type="submit" id="btn-login">Cadastrar</button>
          
        </form>
      </div>

    </div>
  )
}

export default Register
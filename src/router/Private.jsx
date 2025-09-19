import { useState, useEffect } from "react";
import { auth } from "../firebase/fireBaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false); // se o usuário está logado

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            id: user.uid,   
            email: user.email
          };

          localStorage.setItem("@detailsUser", JSON.stringify(userData));
          setSigned(true);
          setLoading(false);
        } else {
          setLoading(false);
          setSigned(false);
        }
      });

      return () => unsub();
    }

    checkLogin();
  }, []);

  if (loading) {
    return <div>carregando...</div>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
}
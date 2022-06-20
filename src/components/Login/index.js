import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Content } from "./Login.style";
import Button from "@mui/material/Button";
import Logout from "../Logout/index";
// import './Logout.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageOne, setMessageOne] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  function handleSubmit(e) {
    e.preventDefault();
    // console.log('Login form:', loginForm);
    var retStatus = 0;
    setMessageOne('Iniciando sesión ...');

    //console.log('User: ' + username.value + ' Password: ' + password.value)

    async function loginRequest() {
      const url = `${process.env.REACT_APP_API_URL}/users/login`;
      let data = { email: username, password: password };

      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      //console.log(res)
      if (res.ok) {
        let ret = await res.json();
        retStatus = `${res.status}`;

        //return JSON.parse(ret.data);
        return ret;
      } else {
        setMessageOne('El nombre de usuario o contraseña son incorrectos. Intente nuevamente');
        return `HTTP error: ${res.status}`;
      }
    }
    loginRequest().then((data) => {
      const retToken = data.token;
      localStorage.setItem("USER_TOKEN", retToken);

      const userId = data.user._id;
      localStorage.setItem("USER_ID", userId);
      console.log("USERID",userId)
      console.log("LOGIN RETURN STATUS", retStatus);
      if (retStatus === "200") {
        setMessageOne("Inicio de sesión exitoso... redirigiendo a la página principal");
        navigate("/tags");
      }
      setMessageTwo("Error de inicio de sesión. Intente nuevamente");
    });
  }

  useEffect(() => {
    if (localStorage.getItem("USER_TOKEN")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <Logout />
      ) : (
        <Content>
          <div>
            <h1>Inicio de sesión</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <input
                id="user"
                type="text"
                placeholder="Correo electrónico"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />
              <input
                id="pword"
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Iniciar sesión
              </Button>
            </form>
            <br />
            <p>{messageOne}</p>
            <p>{messageTwo}</p>
          </div>
        </Content>
      )}
    </>
  );
}

export default Login;

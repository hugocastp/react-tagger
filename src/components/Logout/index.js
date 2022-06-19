import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { Content } from "./Logout.style";

function Logout() {
  const [messageOne, setMessageOne] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  const navigate = useNavigate();

  function handleBack() {
    navigate("/tags");
  }

  function handleLogout(e) {
    e.preventDefault();
    var retStatus = 0;
    setMessageOne("Cerrando sesión...");

    async function logoutRequest() {
      const url = `${process.env.REACT_APP_API_URL}/users/logout`;
      const localStorageToken = localStorage["USER_TOKEN"];

      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorageToken,
        },
      });

      console.log(res);
      if (res.ok) {
        retStatus = `${res.status}`;

        return retStatus;
      } else {
        return `HTTP error: ${res.status}`;
      }
    }

    logoutRequest().then((data) => {
      console.log("LOGOUT RETURN STATUS", retStatus);
      if (retStatus === "200") {
        localStorage.removeItem("USER_TOKEN");
        alert("Sesión cerrada correctamente!");
        setMessageOne("Correct ... redireccionando al Login");
        navigate("/tags");
      }
      setMessageTwo("Error al cerrar sesión. Por favor, intente de nuevo.");
    });
  }

  return (
    <>
      <Content>
        <form onSubmit={handleLogout}>
          <h1>Cerrar sesión</h1>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Confirmar cierre de sesión
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            onClick={handleBack}
            color="primary"
          >
            Regresar
          </Button>
          <p>{messageOne}</p>
          <p>{messageTwo}</p>
        </form>
      </Content>
    </>
  );
}

export default Logout;

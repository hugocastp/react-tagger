import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Content } from './Register.style';
import Button from "@mui/material/Button";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [messageOne, setMessageOne] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    
    let navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        var retStatus = 0;
        setMessageOne('Iniciando sesión ...');

        //console.log("User: " + username.value + " Password: " + password.value)

        async function registerRequest() {
            const url = `${process.env.REACT_APP_API_URL}/users`;
            let data = {
                fname: firstName,
                lname: lastName,
                email: email,
                password: password
            };

            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                return `HTTP error: ${res.status}`;
            }
        }

        registerRequest().then((data) => {
            const retToken = data.token;
            localStorage.setItem('USER_TOKEN', retToken);

            if (retStatus === '201') {
                setMessageOne('Correcto ... redireccionando a la página principal');
                // window.location.replace('/profile');
                navigate('/')
            }
            setMessageTwo('Error al iniciar sesión. Intente nuevamente');
        });
    }

    return (
        <>
            <Content>
                <div>
                    <h1>Crear cuenta</h1>
                    <br />
                    <form onSubmit={handleRegister}>
                        <input
                            id="fname"
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="lname"
                            type="text"
                            placeholder="Apellido"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="pword"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button type='submit' variant="contained" color="primary">Registrarse</Button>
                    </form>

                    <p>{messageOne}</p>
                    <p>{messageTwo}</p>
                </div>
            </Content>
        </>
    );
}

export default Register;
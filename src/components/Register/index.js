import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Content } from './Register.style';
import Button from "@mui/material/Button";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [mobilenum, setMobileNum] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    
    const [messageOne, setMessageOne] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    
    let navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        var retStatus = 0;
        setMessageOne('Logging in ...');

        //console.log("User: " + username.value + " Password: " + password.value)

        async function registerRequest() {
            const url = `${process.env.REACT_APP_API_URL}/users`;
            let data = {
                fname: firstName,
                lname: lastName,
                dob: dob,
                email: email,
                mobilenum: mobilenum,
                password: password,
                type: accountType
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
                setMessageOne('Success ... redirecting to tags');
                // window.location.replace('/profile');
                navigate('/')
            }
            setMessageTwo('Login Error. Please try again');
        });
    }

    return (
        <>
            <Content>
                <div>
                    <h1>Sign Up</h1>
                    <br />
                    <form onSubmit={handleRegister}>
                        <input
                            id="fname"
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="lname"
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="dob"
                            type="dob"
                            placeholder="Date of Birth MM/DD/YYYY"
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <br />
                        <input
                            id="mobilenum"
                            type="tel"
                            placeholder="Phone Number"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={(e) => setMobileNum(e.target.value)}
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
                        <Button type='submit' variant="contained" color="primary">Register</Button>
                    </form>

                    <p>{messageOne}</p>
                    <p>{messageTwo}</p>
                </div>
            </Content>
        </>
    );
}

export default Register;
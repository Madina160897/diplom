import React, { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import localhost from "../common/api";

const Authorization = () => {

    const [emailaut, setEmailaut] = useState('');
    const [passaut, setPassaut] = useState('');
    const navigate = useNavigate();

    let newEmailAuth = {
        email: emailaut,
        password: passaut
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
    }

    function addEventListener() {

        fetch(localhost.BASE_URL + "/users")
            .then(response => response.json())
            .then(user => localStorage.setItem('Users', JSON.stringify(user)))
            .catch(() => alert("err"));

        const users = JSON.parse(localStorage.getItem('Users'))

        for (let i = 0; i <= users.length - 1; i++) {
            if (newEmailAuth.email == users[i].email && newEmailAuth.password == users[i].password) {
                localStorage.setItem('user', JSON.stringify(users[i]))

                navigate("/main")
            }
        }
    }

    return (
        <div className='login-aut-box'>
            <form onSubmit={handleSumbit}>
                <div className="login-aut mt-20">

                    <b className="reg-title">Авторизоваться</b>
                    <input onChange={(e) => setEmailaut(e.target.value)} className='mt-20 input pOneEmail' type="email" placeholder='Электронная почта' />
                    <input onChange={(e) => setPassaut(e.target.value)} className="mt-10 input pOnePassword" type="password" placeholder='Пароль' />
                    <div className="reg mt-20">
                        <Link to="/regis">
                            <span>регистрация</span>
                        </Link>
                    </div>
                    <div>
                        <button onClick={addEventListener} className="btn-reg btn-aut mt-10">Войти</button>
                    </div>

                </div>
            </form>
        </div>
    )

}
export default Authorization
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localhost from "../common/api";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    let newEmail = {
        email,
        password,
        name,
        surname
    }

    function signUp() {

        if (checkDate(newEmail)) {
            fetch(localhost.BASE_URL + "/users/regis", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEmail)
            })
                .then(() => navigate("/"))
                .catch(() => alert("err"));
        } else {
            console.log("err");
        }
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
    }

    function checkDate(newEmail) {
        if (!validateEmail(newEmail.email)) {
            alert("Incorrect email!")
            return false
        } if (!validatePassword(newEmail.password)) {
            alert("Incorrect password!")
            return false
        } else if (newEmail.name.length < 1 || newEmail.surname.length < 1 || newEmail.password.length < 1) {
            alert("Complete all data!")
            return false;
        } else {
            return true
        }

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .match(
                /^\S*(?=.*[A-Z])(?=.*[0-9])(?=.*[/$!*])[a-zA-Z0-9*/$!]{8,}\S*$/g
            );
    };


    return (
        <div>
            <form onSubmit={handleSumbit}>
                <div className="login">
                    <b className="mt-20 reg-title">Регистрация</b>
                    <input onChange={(e) => setEmail(e.target.value)} className="mt-20 input email-reg" type="email" placeholder="Электронная почта" />
                    <input onChange={(e) => setPassword(e.target.value)}  className="mt-10 input password-reg" type="password" placeholder="Пароль" />
                    <input onChange={(e) => setName(e.target.value)}  className="mt-10 input name-reg" type="text" placeholder="Имя" />
                    <input onChange={(e) => setSurname(e.target.value)}  className="mt-10 input surname-reg" type="text" placeholder="Фамилия" />

                    <div>
                        <button onClick={signUp} className="btn-reg mt-20">Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default Registration
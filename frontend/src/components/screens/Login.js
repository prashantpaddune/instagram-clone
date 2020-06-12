import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";

function Login() {
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.err) {
                    M.toast({html: data.err,classes:"#c62828 red darken-3"})
                }
                else {
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    M.toast({html:'Signed In Successful',classes:"#43a047 green darken-1"})
                    history.push('/')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h1 className="hotelfont">Instagram</h1>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(event => setEmail(event.target.value))}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event => setPassword(event.target.value))}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => PostData()}
                >
                    Login
                </button>
                <h6>
                    <Link to="/signup">Don't have an account ?</Link>
                </h6>
                <h6>
                    <Link to="/reset">Forgot password ?</Link>
                </h6>
            </div>
        </div>
    );
}

export default Login;

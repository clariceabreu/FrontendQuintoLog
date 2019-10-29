import React, { useState, useEffect } from 'react';
import '../assets/general/main.min.css';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import logo from '../assets/images/logo-quintolog.png';
import { signIn } from '../actions/Authentication';

const Login = (props) => {
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const handleSignIn = () => {
        dispatch(signIn({
            email: email,
            password: password,
            history: props.history
        }));
    }

    return (
        <div style={styles.container}>
            <img src={logo} height={180} width={300} style={{margin: '50px auto 0'}}/>
            <div style={styles.content}>
                <h1 style={styles.title}>Login</h1>
                <div style={styles.form}>
                    <TextField label="e-mail"
                               variant="outlined"
                               style={styles.input}
                                onChange={(e) => setEmail(e.target.value)}/>
                    <TextField label="senha"
                               variant="outlined"
                               type="password"
                               style={styles.input}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="outlined" 
                            style={styles.button}
                            onClick={handleSignIn}>
                        ENTRAR
                    </Button>
                    <label style={styles.forgotPassword}>Esqueci a senha</label>
                    <div style={styles.regiterDiv}>
                        <span style={styles.register}>Não possui conta?</span>
                        <span style={styles.forgotPassword} onClick={() => props.history.push('/register')}>Realizar cadastro</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column'
    },
    content: {
        background: '#ececec',
        borderRadius: 5,
        padding: '20px 30px 40px',
        width: 'fit-content',
        margin: '70px auto'
    },
    form: {
        display: 'flex', 
        alignContent: 'center', 
        flexDirection: 'column',
    },
    title: {
        alignSelf: 'center', 
        textAlign: 'center',
        fontFamily: 'Gotham'
    },
    input: {
        width: 400,
        marginBottom: 10
    },
    button: {
        background: '#5063f0', 
        color: 'white', 
        borderRadius: 5, 
        marginTop: 20,
        border: 0,
        horizontalAlign: 'middle',
        width: 150,
        alignSelf: 'center',
        fontFamily: 'Gotham',
    },
    forgotPassword: {
        fontFamily: 'Gotham',
        textDecoration: 'underline',
        textAlign: 'center',
        marginTop: 20,
        color: 'blue',
        cursor: 'pointer'
    },
    regiterDiv: {
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 30
    },
    register: {
        fontFamily: 'Gotham',
        textAlign: 'center',
        marginTop: 20,
        marginRight: 5
    }
}
export default Login;
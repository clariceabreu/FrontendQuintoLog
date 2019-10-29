import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/general/main.min.css';
import { Button, TextField, Snackbar, IconButton, SnackbarContent, Select, MenuItem } from '@material-ui/core';
import logo from '../assets/images/logo-quintolog.png';
import { register } from '../actions/Authentication';
import { Close, Error } from '@material-ui/icons';

const Profile = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.authentication);
    
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [edit, setEdit] = useState(false);
    
    const handleRegister = () => {
        if (!name) {
            setToastMessage('Insira o nome');
            setToastOpen(true);
        }
        else if (!email) {
            setToastMessage('Insira o e-mail');
            setToastOpen(true);
        }
        else if (!password) {
            setToastMessage('Insira a senha');
            setToastOpen(true);
        } else if (password.length < 8){
            setToastMessage('A senha deve conter no mínimo 8 caracteres');
            setToastOpen(true);
        } else if (!password.match(new RegExp(/[0-9]/, 'g'))) {
            setToastMessage('A senha deve conter uma letra e um número2');
            setToastOpen(true);
        } else if (!password.match(new RegExp(/[A-Z]/, 'gi'))){
            setToastMessage('A senha deve conter uma letra e um número');
            setToastOpen(true);
        } else {
            dispatch(register({
                email: email,
                password: password
            }));
        }
    }

    const closeToast = () => setToastOpen(false);

    return (
        <div style={styles.container}>
            <img src={logo} height={180} width={300} style={{margin: '50px auto 0'}}/>
            <div style={styles.content}>
                <h1 style={styles.title}>Perfil</h1>
                <div style={styles.form}>
                    {edit ?
                        <div><span style={{fontWeight: 900}}>Nome:</span><span>{user.name}</span></div> :
                        <TextField label="Nome"
                                variant="outlined"
                                style={styles.input}
                                onChange={(e) => setName(e.target.value)}/> }
                    <TextField label="E-mail"
                               variant="outlined"
                               style={styles.input}
                                onChange={(e) => setEmail(e.target.value)}/>
                    <TextField label="Senha"
                               variant="outlined"
                               type="password"
                               style={styles.input}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="outlined" 
                            style={styles.button}
                            onClick={() => setEdit(!edit)}>
                        Editar
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={toastOpen}
                        autoHideDuration={6000}
                        onClose={closeToast}>
                             <SnackbarContent
                                aria-describedby="client-snackbar"
                                style={{backgroundColor: '#d32f2f'}}
                                message={
                                    <div id="client-snackbar" style={{display: 'flex'}}>
                                        <Error style={{marginRight: 5}}/>
                                        <span style={{marginTop: 3}}>{toastMessage}</span>
                                    </div>
                                }
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={closeToast}>
                                        <Close />
                                    </IconButton>
                                ]}
                            />
                    </Snackbar>
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
        padding: '40px 30px 60px',
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
    select: {
        width: 400,
        marginBottom: 10,    
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
    toast: {
        backgroundColor: '#d32f2f'
    }
}
export default Profile;
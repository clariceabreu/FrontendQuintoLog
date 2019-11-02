import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/general/main.min.css';
import { Button, TextField, Snackbar, IconButton, SnackbarContent, Select, MenuItem } from '@material-ui/core';
import logo from '../../assets/images/logo-quintolog.png';
import { updateUser, changePassword } from '../../actions/Authentication';
import { Close, Error } from '@material-ui/icons';

const Profile = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.authentication);
    
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [secQuest, setSecQuest] = useState(user.secQuest ?  user.secQuest : 0);
    const [answer, setAnswer] = useState(user.secQuestAnswer ?  user.secQuestAnswer : 0);
    const [changePassword, setChangePassword] = useState(false);
    
    const handleEdit = () => {
        if (!name) {
            setToastMessage('Insira o nome');
            setToastOpen(true);
        }
        else if (!email) {
            setToastMessage('Insira o e-mail');
            setToastOpen(true);
        } else if (!secQuest){
            setToastMessage('Escolha uma pergunta de segurança');
            setToastOpen(true);
        } else if (!answer){
            setToastMessage('Insira a resposta para a pergunta de segurança');
            setToastOpen(true);
        } else {
            dispatch(updateUser({
                email: email,
                name: name, 
                securityQuestion: secQuest,
                securityAnswer: answer
            }));
        }
    }

    const handleChangePassword = () => {
        if (!password) {
            setToastMessage('Insira a senha');
            setToastOpen(true);
        } else if (!newPassword){
            setToastMessage('Insira a nova senha');
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
            dispatch(changePassword({
                email: email,
                password: password,
                newPassword: newPassword,
            }));
        }
    }

    const closeToast = () => setToastOpen(false);

    function renderFields(){
        if (changePassword){
            return(
                <>
                    <TextField  label="Senha"
                                variant="outlined"
                                type="password"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                    <TextField  label="Nova Senha"
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                style={styles.input}
                                onChange={(e) => setNewPassword(e.target.value)}/>
                </>
            )
        } else {
            return (
                <>
                    <TextField label="Nome"
                                variant="outlined"
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        <TextField label="E-mail"
                                variant="outlined"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        <Select variant="outlined" value={secQuest} style={{...styles.select, color: secQuest == 0  ? '#6c6c6c' : '#1e1e1e'}} onChange={(e) => setSecQuest(e.target.value)}>
                            <MenuItem value={0} disabled style={{fontFamily: 'Gotham'}}>Pergunta de segurança</MenuItem>
                            <MenuItem value={1} style={{fontFamily: 'Gotham'}}>Qual era o nome de seu professor favorito na escola primária?</MenuItem>
                            <MenuItem value={2} style={{fontFamily: 'Gotham'}}>Qual era o nome do seu primeiro animal de estimacão?</MenuItem>
                            <MenuItem value={3} style={{fontFamily: 'Gotham'}}>Qual foi o primeiro filme que você viu no cinema?</MenuItem>
                        </Select>
                        <TextField label="Resposta"
                                    variant="outlined"
                                    style={styles.input}
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}/>
                </>
            )
        }
    }

    return (
        <div style={styles.container}>
            <img src={logo} height={180} width={300} style={{margin: '50px auto 0'}}/>
            <div style={styles.content}>
                <h1 style={styles.title}>Perfil</h1>
                <div style={styles.form}>
                    {renderFields()}
                    <Button variant="outlined" 
                            style={styles.button}
                            onClick={() => changePassword ? handleChangePassword() : handleEdit()}>
                            Editar
                    </Button>
                    <label style={styles.changePassword} onClick={() => setChangePassword(!changePassword)}>{changePassword ? 'Alterar dados' : 'Alterar senha'}</label>
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
    },
    changePassword: {
        fontFamily: 'Gotham',
        textDecoration: 'underline',
        textAlign: 'center',
        marginTop: 20,
        color: 'blue',
        cursor: 'pointer'
    },
}
export default Profile;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/general/main.min.css';
import { Button, TextField, Select, MenuItem, CircularProgress } from '@material-ui/core';
import logo from '../../assets/images/logo-quintolog.png';
import Toast from '../common/Toast';
import { register } from '../../actions/Authentication';
import { showToast } from '../../actions/System';
import { ChevronLeft } from '@material-ui/icons';


const Register = (props) => {
    const dispatch = useDispatch();
    const loadingUrls = useSelector(state => state.system.loadingUrls);
    
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [secQuest, setSecQuest] = useState(-1);
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loadingUrls.includes('users') || loadingUrls.includes('token') || loadingUrls.includes('getData')) setLoading(true);
        else setLoading(false);
    }, [loadingUrls]);
    
    const handleRegister = () => {
        if (!name) {
            dispatch(showToast({
                open: true,
                message: 'Insira o nome',
                type: 'error'
            }));
        }
        else if (!email) {
            dispatch(showToast({
                open: true,
                message: 'Insira o e-mail',
                type: 'error'
            }));
        }
        else if (!password) {
            dispatch(showToast({
                open: true,
                message: 'Insira o senha',
                type: 'error'
            }));
        } else if (password.length < 8){
            dispatch(showToast({
                open: true,
                message: 'A senha deve conter no mínimo 8 caracteres',
                type: 'error'
            }));
        } else if (!password.match(new RegExp(/[0-9]/, 'g'))) {
            dispatch(showToast({
                open: true,
                message: 'A senha deve conter uma letra e um número',
                type: 'error'
            }));
        } else if (!password.match(new RegExp(/[A-Z]/, 'gi'))){
            dispatch(showToast({
                open: true,
                message: 'A senha deve conter uma letra e um número',
                type: 'error'
            }));
        } else if (secQuest === -1){
            dispatch(showToast({
                open: true,
                message: 'Escolha uma pergunta de segurança',
                type: 'error'
            }));
        } else if (!answer){
            dispatch(showToast({
                open: true,
                message: 'Insira a resposta para a pergunta de segurança',
                type: 'error'
            }));
        } else {
            dispatch(register({
                email: email,
                password: password,
                name: name,
                "security_question": secQuest.toString(),
                "security_answer": answer,
                history: props.history
            }));
        }
    }

    return (
        <div style={styles.container}>
            <img src={logo} height={180} width={300} style={{margin: '50px auto 0'}} alt="logo"/>
            <div style={styles.back} onClick={() => props.history.push({pathname: '/login'})}>
                <ChevronLeft style={{ fontSize: 40}} />
                <p style={styles.backText}>Voltar</p>
            </div>
            <div style={styles.content}>
                <h1 style={styles.title}>Cadastro</h1>
                <div style={styles.form}>
                    <TextField label="Nome"
                               variant="outlined"
                               style={styles.input}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField label="E-mail"
                               variant="outlined"
                               style={styles.input}
                                onChange={(e) => setEmail(e.target.value)}/>
                    <TextField label="Senha"
                               variant="outlined"
                               type="password"
                               style={styles.input}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <Select variant="outlined" value={secQuest} style={{...styles.select, color: secQuest === -1  ? '#6c6c6c' : '#1e1e1e'}} onChange={(e) => setSecQuest(e.target.value)}>
                        <MenuItem value={-1} disabled style={{fontFamily: 'Gotham'}}>Pergunta de segurança</MenuItem>
                        <MenuItem value={0} style={{fontFamily: 'Gotham'}}>Qual era o nome de seu professor favorito na escola primária? </MenuItem>
                        <MenuItem value={1} style={{fontFamily: 'Gotham'}}>Qual era o nome do seu primeiro animal de estimacão?</MenuItem>
                        <MenuItem value={2} style={{fontFamily: 'Gotham'}}>Qual foi o primeiro filme que você viu no cinema?</MenuItem>
                    </Select>
                    <TextField label="Resposta"
                               variant="outlined"
                               style={styles.input}
                               onChange={(e) => setAnswer(e.target.value)}/>
                    <Button variant="outlined" 
                            style={styles.button}
                            onClick={handleRegister}>
                        {loading ? <CircularProgress size={24} style={{color: 'white'}} /> : 'CADASTRAR'}
                    </Button>
                    <label style={styles.backButton} onClick={() => props.history.push('/recuperarSenha')}>Esqueci a senha</label>
                    <Toast/>
                </div>
            </div>
        </div>
    )
}

const styles = {
    back: {
        margin: '20px auto 0',
        display: 'flex',
        cursor: 'pointer',
        width: 475
    },
    backText: {
        fontSize: 18,
        fontFamily: 'Gotham',
        marginTop: 12
    },
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
        margin: '5px auto'
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
    backButton: {
        fontFamily: 'Gotham',
        textDecoration: 'underline',
        textAlign: 'center',
        marginTop: 20,
        color: 'blue',
        cursor: 'pointer'
    },
}
export default Register;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons'
import {  Popover, Button } from '@material-ui/core';
import '../../assets/general/main.min.css';
import { signOut } from '../../actions/Authentication';
import logo from '../../assets/images/logo-quintolog.png';

const Header = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.userData);
    const token = useSelector(state => state.authentication.token);

    const [anchorEl, setAnchorEl] = useState(null);

    return(
        <div style={styles.header}>
            <div style={{display: 'flex'}}>
                <img src={logo} height={70} width={110} style={{margin: '20px 40px'}} alt="logo"/>
                <div style={{marginTop: 27}}>
                    <label style={styles.title}>Bem vind@ {user.name ? user.name : 'Usuário'}</label><br/>
                    {/* <label style={styles.subTitle}>Seu token é {user.token}</label> */}
                </div>
            </div>
            <AccountCircle style={{fontSize: 60, margin: '27px 40px', cursor: 'pointer'}} aria-describedby={'account'} onClick={(e) => setAnchorEl(e.currentTarget)}/>
            <Popover
                id={'account'}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                style={{height: 500}}>
                    <div style={styles.popoverContainer}>
                        <div>
                            <p style={styles.popOverLabels}>{user.name ? user.name : 'Usuário'}</p>
                            <p style={styles.popOverLabels}>Token: {token}</p>
                        </div>
                        <div style={styles.popoverButtons}>
                            <Button style={styles.buttonProfile} onClick={() => props.history.push('/perfil')}>MEU PERFIL</Button>
                            <Button style={styles.buttonLogOut} onClick={() => dispatch(signOut())}>SAIR</Button>
                        </div>
                    </div>
                </Popover>
        </div>
    )
}
const styles = {
    header: {
        height: 100,
        background: '#ececec',
        margin: -20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    title:{
        alignSelf: 'center', 
        fontFamily: 'Gotham',
        fontSize: 26, 
    },
    subTitle:{
        alignSelf: 'center', 
        fontFamily: 'Gotham',
        fontSize: 18,
    },
    popoverContainer: {
        width: 300, 
        padding: '15px 30px'
    },
    popOverLabels: {
        fontFamily: 'Gotham',
        wordBreak: 'break-all'
    },
    popoverButtons: {
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 20
    },
    buttonProfile: {
        fontFamily: 'Gotham', 
        background: '#5063f0',
        color: 'white',
        height: 40,
        width: 150,
        marginRight: 50
    },
    buttonLogOut: {
        fontFamily: 'Gotham', 
        border: '1px solid black',
        color: 'black',
        height: 40,
        width: 80,
    }
}
export default Header;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/general/main.min.css';
import { ChevronLeft } from '@material-ui/icons';
import Header from '../../components/common/Header';
import { Redirect } from 'react-router-dom'

const LogInfo = (props) => {
        const log = useSelector(state => state.logs.find(l => l.id == props.match.params.id));
        const user = useSelector(state => state.users.find(u => u.id == log.userId) || {});
        const userLogged = useSelector(state => state.authentication);

        function getLabel(level) {
                if (level === 'debug') return (<label style={{ background: '#00ff00', padding: 10, borderRadius: 5 }}>{level}</label>)
                else if (level === 'warning') return (<label style={{ background: '#ffdd42', padding: 10, borderRadius: 5 }}>{level}</label>)
                return (<label style={{ background: '#ff6961', padding: 10, borderRadius: 5 }}>{level}</label>)
        }

        return (
                <>
                {userLogged.token ?
                <div>
                        <Header {...props}/>
                        <div>
                                {console.log(props)}
                                <div style={styles.back} onClick={() => props.history.push({pathname: '/'})}>
                                        <ChevronLeft style={{ fontSize: 40 }} />
                                        <p style={styles.backText}>Voltar</p>
                                </div>
                                <div style={styles.container}>
                                        {log.createdAt && <p style={styles.title}>Erro no 127.0.01 em {log.createdAt}</p>}
                                        <div style={styles.info}>
                                                <div>
                                                        <p style={styles.detailsTitle}>Título</p>
                                                        <p style={styles.detailsSubtitle}>acceleration.Service.AddCandidate</p>
                                                        <p style={styles.detailsTitle}>Detalhes</p>
                                                        <p style={styles.detailsSubtitle}>File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error</p>
                                                        <p style={styles.detailsSubtitle}>File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error</p>
                                                        <p style={styles.detailsSubtitle}>File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error</p>
                                                </div>
                                                <div>
                                                        
                                                        {log.level && <div style={styles.detailsTitle}>{getLabel(log.level)}</div>}
                                                        {log.numberEvents && 
                                                                <div>
                                                                        <p style={styles.detailsTitle}>Eventos</p>
                                                                        <p style={styles.detailsSubtitle}>{log.numberEvents}</p>
                                                                </div>
                                                        }
                                                        {user.name && 
                                                                <div>
                                                                        <p style={styles.detailsTitle}>Coletado por</p>
                                                                        <p style={styles.detailsSubtitle}>Token do usuário {user.name}</p> 
                                                                </div>
                                                        }
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div> :  <Redirect to='/login'/>}
                </>
        )

}
const styles = {
        back: {
                margin: '80px 50px 0',
                display: 'flex',
                cursor: 'pointer'
        },
        backText: {
                fontSize: 18,
                fontFamily: 'Gotham',
                marginTop: 12
        },
        container: {
                margin: '0 50px',
                background: '#ececec',
                padding: '50px 80px'
        },
        content: {
                display: 'flex',
                justifyContent: 'space-around'
        },
        title: {
                fontSize: 24,
                fontFamily: 'Gotham',
                marginBottom: 30
        },
        info: {
                display: 'flex',
                justifyContent: 'space-between'
        },
        details: {
                width: '80%'
        },
        detailsTitle: {
                fontSize: 18,
                fontFamily: 'Gotham',
                marginTop: 30,
        },
        detailsSubtitle: {
                fontSize: 14,
                fontFamily: 'Gotham',
                marginTop: 10,
        },
}
export default LogInfo;
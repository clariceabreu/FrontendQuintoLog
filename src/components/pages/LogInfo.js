import React from 'react';
import { useSelector } from 'react-redux';
import '../../assets/general/main.min.css';
import { ChevronLeft } from '@material-ui/icons';
import Header from '../../components/common/Header';
import { Redirect } from 'react-router-dom';

const LogInfo = (props) => {
        const log = useSelector(state => state.logs.find(l => l.id.toString() === props.match.params.id)); 
        const token = useSelector(state => state.authentication.token);

        function getLabel(level_log) {
                const level = level_log.toLowerCase();
                if (level === 'debug') return (<label style={{ background: '#00ff00', padding: 10, borderRadius: 5 }}>{level}</label>)
                else if (level === 'warning') return (<label style={{ background: '#ffdd42', padding: 10, borderRadius: 5 }}>{level}</label>)
                return (<label style={{ background: '#ff6961', padding: 10, borderRadius: 5 }}>{level}</label>)
        }

        return (
                <>
                {token ?
                <div>
                        <Header {...props}/>
                        <div>
                                <div style={styles.back} onClick={() => props.history.push({pathname: '/'})}>
                                        <ChevronLeft style={{ fontSize: 40}} />
                                        <p style={styles.backText}>Voltar</p>
                                </div>
                                <div style={styles.container}>
                                        {log ? 
                                                <>
                                                {log.created_at && log.ip && <p style={styles.title}>Erro no {log.ip} em {log.created_at}</p>}
                                                <div style={styles.info}>
                                                        <div>
                                                                <p style={styles.detailsTitle}>Título</p>
                                                                <p style={styles.detailsSubtitle}>{log.title}</p>
                                                                <p style={styles.detailsTitle}>Detalhes</p>
                                                                <p style={styles.detailsSubtitle}>{log.description}</p>
                                                                <p style={styles.detailsSubtitle}>{log.details}</p>
                                                                <p style={styles.detailsSubtitle}>at {log.stack_trace}</p>
                                                        </div>
                                                        <div>
                                                                
                                                                {log.level_log && <div style={styles.detailsTitle}>{getLabel(log.level_log)}</div>}
                                                                {log.number_events && 
                                                                        <div>
                                                                                <p style={styles.detailsTitle}>Eventos</p>
                                                                                <p style={styles.detailsSubtitle}>{log.number_events}</p>
                                                                        </div>
                                                                }
                                                                {log.source_application && 
                                                                        <div>
                                                                                <p style={styles.detailsTitle}>Coletado pela aplicação</p>
                                                                                <p style={styles.detailsSubtitle}>{log.source_application}</p> 
                                                                        </div>
                                                                }
                                                        </div>
                                                </div> 
                                                </> :
                                        <p style={{...styles.title, textAlign: 'center'}}>Log não encontrado</p>}
                                </div>
                        </div> 
                </div> :  <Redirect to='/login'/>}
                </>
        )

}
const styles = {
        back: {
                margin: '80px 30px 0',
                display: 'flex',
                cursor: 'pointer'
        },
        backText: {
                fontSize: 18,
                fontFamily: 'Gotham',
                marginTop: 12
        },
        container: {
                margin: '0 40px',
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
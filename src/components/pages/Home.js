import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/general/main.min.css';
import { Button, TextField, IconButton, Select, MenuItem, InputAdornment, Paper, Table,
        TableBody, TableHead, TableCell, TableRow, Checkbox, TablePagination, TableFooter} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Header from '../common/Header';
import Toast from '../common/Toast';
import { showToast } from '../../actions/System';
import { getLogs, updateLog } from '../../actions/Logs';
import { Redirect } from 'react-router-dom'
import u from 'underscore';

const Home = (props) => {
    const dispatch = useDispatch();

    const logs = useSelector(state => state.logs);
    const token = useSelector(state => state.authentication.token);

    useEffect(() => {
        if (token) dispatch(getLogs());
    }, []);
    
    const [rows, setRows] = useState([]);
    const [showArchives, setShowArchives] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState(0);
    const [environment, setEnvironment] = useState(0);

    useEffect(() => {
        setRows(logs.filter(l => l.status === 'ACTIVE'));
    }, [logs]);

    const handleCheckAll = () => {
        let update = [...rows];
        if(update.some(r => !r.checked)) update.forEach(r => r.checked = true);
        else update.forEach(r => r.checked = false);
        setRows(update);
    }
    
    const handleCheckRow = (id) => {
        let update = [...rows];
        let row = update.find(r => r.id === id);
        row.checked = !row.checked;
        setRows(update);
    }

    const handleArchive = () => {
        if(rows.some(r => r.checked)){
            rows.forEach(r => {
                if (r.checked) dispatch(updateLog({
                    id: r.id,
                    status: showArchives ? 'active' : 'archived'
                }));
            })
        } else
            dispatch(showToast({
                open: true,
                message: 'Selecione pelo menos um item',
                type: 'error'
            }));
    }

    const handleDelete = () => {
        if(rows.some(r => r.checked)){
            rows.forEach(r => {
                if (r.checked) dispatch(updateLog({
                    id: r.id,
                    status: 'deleted'
                }));
            })
        } else 
            dispatch(showToast({
                open: true,
                message: 'Selecione pelo menos um item',
                type: 'error'
            }));
    }

    const handleShowArchiveds = () => {
        if(showArchives) setRows(logs.filter(l => l.status === 'active'));
        else setRows(logs.filter(l => l.status === 'archived'));
        setShowArchives(!showArchives);
    }

    const handleChangePage = (event, page) => {
        setPage(page);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
    };

    function getLabel(row){
        const level = row.level_log.toLowerCase();
        if (level === 'debug') return(<div style={{...styles.levelLabel, background: '#00ff00'}}><label>{level}</label></div>)
        else if (level === 'warning') return(<div style={{...styles.levelLabel,  background: '#ffdd42'}}><label>{level}</label></div>)
        return(<div style={{...styles.levelLabel, background: '#ff6961'}}><label style={{textAlign: 'center'}}>{level}</label></div>)
    }

    function getData(){
        console.log(environment);
        if (orderBy === 'frequency') return u.sortBy(rows, 'numberEvents').reverse();
        else if (orderBy === 'level') return u.sortBy(rows, 'log_level');
        return rows.filter(r => environment !== 0 && environment !== 'ALL' ? r.environment == environment : true);
    }

    return (
        <>            
            {token ?
            <div style={styles.container}>
                <Header {...props} />
                <div style={styles.content}>
                    <div style={styles.filter}>
                        <div style={{display: 'flex'}}>
                            <Select variant="outlined" value={environment} style={styles.select} onChange={(e) => setEnvironment(e.target.value)}>
                                <MenuItem value={0} disabled style={{fontFamily: 'Gotham'}}>Ambiente</MenuItem>
                                <MenuItem value='ALL' style={{fontFamily: 'Gotham'}}>Todos</MenuItem>
                                <MenuItem value='PRODUCTION' style={{fontFamily: 'Gotham'}}>Produção</MenuItem>
                                <MenuItem value='HOMOLOG' style={{fontFamily: 'Gotham'}}>Homologação</MenuItem>
                                <MenuItem value='DEV' style={{fontFamily: 'Gotham'}}>Dev</MenuItem>
                            </Select>
                            <Select variant="outlined" style={styles.select} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                                <MenuItem value={0} disabled style={{fontFamily: 'Gotham'}}>Ordenar por</MenuItem>
                                <MenuItem value='level' style={{fontFamily: 'Gotham'}}>Level</MenuItem>
                                <MenuItem value='frequency' style={{fontFamily: 'Gotham'}}>Frequência</MenuItem>
                            </Select>
                        </div>
                        <TextField label="Busque por level, descrição ou frequência"
                                variant="outlined"
                                style={{width: '55%'}}
                                InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <Search/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: styles.search
                                }}
                        />
                    </div>
                    <Paper style={{marginTop: 60}}>
                        <div style={styles.tableButtonsContainer}>
                            <div style={{display: 'flex'}}>
                                <Button variant="outlined" 
                                        style={styles.tableButtons}
                                        onClick={handleArchive}>{showArchives ? 'Desarquivar' : 'Arquivar'}</Button>
                                <Button variant="outlined" 
                                        style={styles.tableButtons}
                                        onClick={handleDelete}>Apagar</Button>
                            </div>
                            <Button variant="outlined" 
                                    style={styles.tableButtons}
                                    onClick={handleShowArchiveds}>{showArchives ? 'Voltar' : 'Ver Arquivadas'}</Button>
                        </div>
                        <Table>
                            <TableHead style={{background: '#5063f0'}}>
                            <TableRow>
                                <TableCell key='a'><Checkbox style={{color: 'white'}} labelStyle={{color: 'white'}} onClick={handleCheckAll}/></TableCell>
                                <TableCell key='b' style={styles.tableHeader}>Level</TableCell>
                                <TableCell key='c' style={styles.tableHeader}>Log</TableCell>
                                <TableCell key='d' style={styles.tableHeader}>Eventos</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {getData().map((row, i) => {
                                    return(
                                        <TableRow key={row.id} onClick={() => props.history.push({pathname: '/logInfo/' + row.id})} style={{cursor: 'pointer'}}>
                                            <TableCell key={row.id + '_1'} onClick={(e) => e.stopPropagation()}><Checkbox color="black" onClick={() => handleCheckRow(row.id)} checked={row.checked}/></TableCell>
                                            <TableCell key={row.id + '_2'} style={{fontFamily: 'Gotham'}}>{getLabel(row)}</TableCell>
                                            <TableCell key={row.id + '_3'} style={{fontFamily: 'Gotham'}}>{row.description}</TableCell>
                                            <TableCell key={row.id + '_4'} style={{fontFamily: 'Gotham'}}>{row.number_events}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination 
                                        rowsPerPageOptions={[5, 10, 25]} 
                                        colSpan={4} 
                                        count={Math.ceil(rows.length/rowsPerPage)} 
                                        rowsPerPage={rowsPerPage} 
                                        page={page} 
                                        SelectProps={{
                                            native: true
                                        }} 
                                        onChangePage={handleChangePage} 
                                        onChangeRowsPerPage={handleChangeRowsPerPage} 
                                        labelRowsPerPage="Itens por página"
                                        labelDisplayedRows={({ from, to, count }) => (`${from}-${to} de ${count}`)}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </div>
                <Toast/>
            </div> : <Redirect to='/login'/>}
        </>
    )
}

const styles = {
    container: {
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column',
    },
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
    profile: {
        fontSize: 26,
        float: 'right',
        color: 'white',
    },
    content: {
        padding: 50,
    },
    filter: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    select: {
        width: 250,
        height: 55,
        fontFamily: 'Gotham',
        marginRight: 20
    },
    tableHeader: {
        fontFamily: 'Gotham',
        fontWeight: 1200,
        color: 'white'
    },
    tableButtons: {
        margin: 20, 
        fontFamily: 'Gotham', 
        borderColor: 'white',
        color: 'white'
    },
    tableButtonsContainer: {
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        borderRight: '5px solid white',  
        background: '#5063f0'
    }, 
    levelLabel: {
        padding: 10, 
        borderRadius: 5,
        width: 55,
        textAlign: 'center'
    }
}
export default Home;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Close, Error, CheckCircle } from '@material-ui/icons';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { showToast } from '../../actions/System';

const Toast = () => {
    const dispatch = useDispatch();

    const toast = useSelector(state => state.system.toast);

    const closeToast = () => 
        dispatch(showToast({
            open: false,
            type: toast.type
        }));

    return(
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={toast.open}
            autoHideDuration={2000}
            onClose={closeToast}>
                    <SnackbarContent
                        aria-describedby="client-snackbar"
                        style={{backgroundColor: toast.type === 'error' ? '#d32f2f' : '#43a047'}}
                        message={
                            <div id="client-snackbar" style={{display: 'flex'}}>
                                {toast.type === 'error' ? <Error style={{marginRight: 5}}/> : <CheckCircle style={{marginRight: 5}}/>}
                                <span style={{marginTop: 3}}>{toast.message}</span>
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
    )
}
export default Toast;
export const INITIAL_STATE = {
    authentication: {
      token: '',
      userData: {
          id: '',
          name: '',
          email: '',
          security_question: '',
          security_answer: ''
      }
    },
    system: {
        toast: {
            open: false, 
            type: '', 
            message: ''
        },
        loadingUrls: [],
    },
    logs: [],
};
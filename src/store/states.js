export const INITIAL_STATE = {
    authentication: {
      token: 'idjisdjjiij',
      name: 'Clarice Abreu',
      email: '',
      secQuest: 1,
      secQuestAnswer: 'Minininho'
    },
    system: {
        toast: {
            open: false, 
            type: '', 
            message: ''
        }
    },
    logs: [
        {
            id: 2,
            level: 'warning',
            description: 'descrição 2',
            numberEvents: 1000,
            checked: false,
            status: 'archived'
        },
        {
            id: 1,
            level: 'debug',
            description: 'descrição',
            numberEvents: 15,
            status: 'active',
            details: 
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n'+
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n'+
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n'+
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n'+
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n'+
                'File "go/pkg/mod/github.com/seila/oque/", line 228, in (*Logger).Error\n',
            createdAt: '04/08/1998 15:00',
            userId: 1,
            environment: 'production',
        },
        {
            id: 3,
            level: 'warning',
            description: 'descrição 3',
            numberEvents: 1000,
            checked: false,
            status: 'active'
        },
        {
            id: 4,
            level: 'error',
            description: 'descrição 4',
            numberEvents: 1000,
            checked: false,
            status: 'active'
        },
    ],
    users: [
        {
            id: 1,
            name: 'Clarice Abreu'
        }
    ]
};
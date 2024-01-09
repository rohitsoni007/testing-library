const API = {
    AUTH: {
        REGISTER:'/auth/register',
        LOGIN:'/auth/login',
        ME:'/auth/me',
    },
    RESUME: {
        ADD: '/resume',
        GET: '/resume',
        EDIT: (id)=>`/resume/${id}`,
        DELETE: (id)=>`/resume/${id}`,
        GET_ONE: (id)=>`/resume/${id}`,
    }
}


module.exports = {
    API
}
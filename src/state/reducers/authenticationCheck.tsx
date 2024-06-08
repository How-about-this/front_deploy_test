interface AuthState {
    isAuthed: boolean;
}

type authAction = {type: 'APPROVE_USER'} | {type: 'DENY_USER'};

const initialState: AuthState = {
    isAuthed: false,
}

const authenticationCheck = (state: AuthState = initialState, action: authAction ): AuthState  => {
    switch (action.type) {
        case 'APPROVE_USER':
            return {...state, isAuthed: true};
        case 'DENY_USER':
            return {...state, isAuthed: false};
        default:
            return state;
    } 
}

export default authenticationCheck;
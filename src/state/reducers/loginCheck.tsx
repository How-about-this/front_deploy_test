interface LoginState {
    isLogined: boolean;
}

type loginAction = {type: 'APPROVE_USER'} | {type: 'DENY_USER'};

const initialState: LoginState = {
    isLogined: false,
}

const loginCheck = (state: LoginState = initialState, action: loginAction ): LoginState  => {
    switch (action.type) {
        case 'APPROVE_USER':
            return {...state, isLogined: true};
        case 'DENY_USER':
            return {...state, isLogined: false};
        default:
            return state;
    } 
}

export default loginCheck;
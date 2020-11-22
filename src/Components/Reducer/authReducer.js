export default function authReducer(state={}, action){
    switch(action.type){
        case 'AUTH_SUCCESS':{
            localStorage.setItem('name',action.payload.name)
            localStorage.setItem('password',action.payload.password)
            return action.payload
        }

        case 'PAGE_LOADED':{
            const onLoad={name:null, password:null}
            onLoad.name=localStorage.getItem('name')? localStorage.getItem('name'):null
            onLoad.password=localStorage.getItem('password')? localStorage.getItem('password'):null
            return onLoad
        }

        case 'LOGOUT':{
            localStorage.clear()
            return {name:null, password:null}
        }

        default:{
            return state
        }
    }
}
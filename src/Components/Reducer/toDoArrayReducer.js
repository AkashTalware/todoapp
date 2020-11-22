export default function toDoArrayReducer (state={}, action){
    switch (action.type){
        case 'ADD_TASK':{
            console.log(action.payload, state, 'payload')
            return [...state, action.payload]
        }

        case 'DELETE_TASK':{
            return [...state.slice(0,action.payload), ...state.slice(action.payload+1)]
        }
        
        case 'EDIT_TASK':{
            const{index, task}=action.payload
            return[...state.slice(0,index), {...state[index], ...task}, ...state.slice(index+1)]
        }

        case 'CHECKBOX':{
            return[...state.slice(0,action.payload), {...state[action.payload], checkboxstatus: ! state[action.payload].checkboxstatus}, 
            ...state.slice(action.payload+1)]
        }

        default :{
            return state
        }
    }
}
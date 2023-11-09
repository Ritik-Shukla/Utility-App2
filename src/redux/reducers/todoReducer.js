const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState={
    todos:[
    ]
}
export const getInitialStateAsync = createAsyncThunk(
    "todo/getInitialState",
    (Arg,thunkAPI)=>{
        fetch("http://localhost:4100/api/todos")
        .then(res => res.json())
        .then(data => {
        thunkAPI.dispatch(actions.setInitialState(data))
    //   dispatch(actions.setInitialState(data));
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
    }
)

// export const addTodoAsync = createAsyncThunk("todo/addTodo",
// async (payload)=>{
//     const response = await fetch("http://localhost:4100/api/todos",{
//         method:"POST",
//         headers:{
//             "content-type":"application/json"
//         },
//         body:JSON.stringify({
// text:payload,
// completed:false
//         })
//     })
//     return response.json()
// }
// )

// Creating Reducer using Redux Toolkit

const todoSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
    
        setInitialState:(state,action)=>{
           state.todos=[...action.payload]
        },



        // this is add action
        add:(state, action)=>{
                state.todos.push({
                    text:action.payload,
                    completed: false
                })
        },
        toggle:(state, action)=>{
            state.todos.map((todo, i)=>{
                if(i==action.payload){
                    todo.completed=!todo.completed;
                }
                return todo;
            })
        }
    }

    // extraReducers:(builder)=>{
    //     builder.addCase(addTodoAsync.fulfilled,(state,action)=>{
    //         console.log(action.payload)
    //         state.todos.push(action.payload)
    //     })
    // }
});

export const todoReducer=todoSlice.reducer;

export const actions = todoSlice.actions;

// selector
export const todoSelector = (state)=>state.todoReducer.todos;



// Reducer using redux

// export function todoReducer(state=initialState, action){

//     switch(action.type){
//         case ADD_TODO:
//             return {
//                 ...state,
//                 todos:[
//                     ...state.todos,
//                     {
//                         text:action.text,
//                         completed: false
//                     }
//                 ]
//             }
//         case TOGGLE_TODO:
//             return{
//                 ...state,
//                 todos: state.todos.map((todo, i)=>{
//                     if(i==action.index){
//                         todo.completed=!todo.completed
//                     }
//                     return todo;
//                 })
//             }
//         default:
//             return state;
//     }
// }
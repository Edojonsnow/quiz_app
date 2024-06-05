import {createSlice} from "@reduxjs/toolkit"

// create reducer

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 1
    },
    reducers : {
        startExamAction : (state,action)=> {
            return {
                ...state,
                queue: action.payload
            }
        },
        moveNextAction: (state) =>{
            return{
                ...state,

                trace: state.trace + 1

            }

        }
    }
})

export const {startExamAction,moveNextAction} = questionReducer.actions
export default questionReducer.reducer;
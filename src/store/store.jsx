import { createStore, createSlice, configureStore } from "@reduxjs/toolkit";

// const store = (state = { value: {} }, action) => {
//     if(action.type === "step1") {
//         return {
//             value: {
//                 ...state.value,
//                 ...action.payload,
//             }
//         }
//     }

//     if(action.type === "step2") {
//         return {
//             value: {
//                 ...state.value,
//                 ...action.payload,
//             }
//         }
//     }
//     if(action.type === "step3") {
//         return {
//             value: {
//                 ...state.value,
//                 ...action.payload,
//             }
//         }
//     }
//     return state;
// }

const initialState = {
    value: {}
}

const formSlice = createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        step1(state, action) {
            state.value = {
                ...state.value,
                ...action.payload
            } 
        },
        step2(state, action) {
            state.value = {
                ...state.value,
                ...action.payload
            } 
        },
        step3(state, action) {
            state.value = {
                ...state.value,
                ...action.payload
            } 
        },

        finishing(state, action) {
            state.value = {
                
            }
        }
    }
})



const store = configureStore({reducer: formSlice.reducer})



export const formActions = formSlice.actions

export default store;
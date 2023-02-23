import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shipping:{},
    card:{}
    }

    export const userSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        saveShipping:(state,action)=>
        {
            state.shipping = action.payload.shipping
        },
        saveCard:(state,action)=>
        {
            state.card = action.payload.card
        },
        clearShipping:(state)=>
        {
            state.shipping = {};
            state.card = {};
        },
    },
})
export const { saveShipping ,clearShipping , saveCard} = userSlice.actions
export default userSlice.reducer
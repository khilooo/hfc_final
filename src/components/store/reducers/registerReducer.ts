import { createSlice } from '@reduxjs/toolkit'


const registerSlice = createSlice({
    name: 'register',
    initialState: {},
    reducers: {
        register: (state, action) => {
            state.state.push({email: action.payload})
        }
    }
})

export const {register } = registerSlice.actions
export default registerSlice.reducer

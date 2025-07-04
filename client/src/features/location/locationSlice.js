import {createSlice} from '@reduxjs/toolkit';

const initialState = { city:[],state:[],country:[] };

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCity(state, action) {
        state.city = action.payload;
        },
        setState(state, action) {
        state.state = action.payload;
        },
        setCountry(state, action) {
        state.country = action.payload;
        },
    },
    });

export const {setCity,setCountry,setState} = locationSlice.actions;

export default locationSlice.reducer;
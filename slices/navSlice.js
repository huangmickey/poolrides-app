import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // initial values of a rider selecting origin/destination
    origin: null,
    destination: null,
    // information regarding distance from origin to destination
    travelTimeInformation: null,
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
    navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
    state.nav.travelTimeInformation;

export default navSlice.reducer;
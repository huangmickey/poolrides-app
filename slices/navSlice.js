import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    // informaiton regarding the ride such as type, and cost.
    rideInformation: null,
    pushToken: null,
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
        setRideInformation: (state, action) => {
            state.rideInformation = action.payload;
        },
        setPushToken: (state, action) => {
            state.pushToken = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation, setRideInformation, setPushToken} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectRideInformation = (state) => state.nav.rideInformation;
export const selectPushToken = (state) => state.nav.pushToken;

export default navSlice.reducer;
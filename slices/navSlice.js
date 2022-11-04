import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    rideInformation: null,
    pushToken: null,
    driverLocation: null,
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
        setDriverLocation: (state, action) => {
            state.driverLocation = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation, setRideInformation, setPushToken, setDriverLocation } = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectRideInformation = (state) => state.nav.rideInformation;
export const selectPushToken = (state) => state.nav.pushToken;
export const selectDriverLocation = (state) => state.nav.driverLocation;

export default navSlice.reducer;
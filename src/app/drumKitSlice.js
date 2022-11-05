import { createSlice } from "@reduxjs/toolkit";

import { HeaterKit, SmoothPianoKit } from './constants'

const initialState = {
    title: '',
    audio: '',
    bank: false,
    power: true,
    kit: [...HeaterKit],
    volume: 0.3,
}

export const drumKitSlice = createSlice({
    name: 'drumKit',
    initialState,
    reducers: {
        play: (state, action) => {
            state.title = action.payload.title
            state.audio = action.payload.audio
            let audio = new Audio(action.payload.audio)
            if (state.power) {
                audio.volume = state.volume
                audio.play();
            }
        },
        switchKit: (state) => {
            state.title = state.bank ? 'Heater Kit' : 'Smooth Piano Kit'
            state.bank = state.bank ? false : true
            state.kit = state.bank ? [...SmoothPianoKit] : [...HeaterKit]
        },
        switchPower: (state) => {
            state.power = state.power ? false : true
        },
        volumeChange: (state, action) => {
            state.volume = action.payload
        }
    }
})

export const { play, switchKit, switchPower, volumeChange } = drumKitSlice.actions

export const selectTitle = (state) => state.drumKit.title
export const selectAudio = (state) => state.drumKit.audio
export const selectBank = (state) => state.drumKit.bank
export const selectPower = (state) => state.drumKit.power
export const selectKit = (state) => state.drumKit.kit
export const selectVolume = (state) => state.drumKit.volume

export default drumKitSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export type ITheme = {
    value: string;
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {value: "light"},
    reducers: {
        toggle(state) {
            const newTheme = state.value === 'light' ? 'dark' : 'light'
            console.log("wanna change theme to ", newTheme, 'from', state.value)
            state.value = newTheme;
        }
    }
})

export const { toggle } = themeSlice.actions

export default themeSlice.reducer
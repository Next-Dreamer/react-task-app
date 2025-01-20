import { createSlice } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

type loggerState = {
    logArray: ILogItem[]
}

const initialState: loggerState = {
    logArray: []
}

const loggerslice = createSlice({
    name: 'logger',
    initialState,
    reducers: {

    }
})

export const loggerReducer = loggerslice.reducer;
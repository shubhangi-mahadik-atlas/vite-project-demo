import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    No: number,
    Name: string,
    Address: string
}
const initialStateValue: IUser[] = [];

const slice = createSlice({name: "users", initialState: initialStateValue
    , reducers: {
        setUserTo: (state, param: PayloadAction<IUser>) => {state.push({No: param.payload.No, Name: param.payload.Name, Address: param.payload.Address})},
        setUsersTo: (state, param: PayloadAction<IUser[]>) => {state.push(...param.payload)}
    }});

export const {setUserTo, setUsersTo} = slice.actions;

export default slice.reducer;
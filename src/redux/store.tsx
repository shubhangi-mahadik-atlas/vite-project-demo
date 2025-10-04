import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

const store = configureStore({reducer: {data: slice}});  

export default store;
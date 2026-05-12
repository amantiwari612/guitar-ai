import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import videoReducer from "./reducers/videoReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
});

export default rootReducer;
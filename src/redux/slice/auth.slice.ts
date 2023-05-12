import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IAuth, IErrorAuth, IUser} from "../../interfaces";
import {authService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    error: IErrorAuth,
    me: IUser
}

const initialState: IState = {
    error: null,
    me: null
};

const register = createAsyncThunk<void, IAuth>(
    'authService/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.login(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
            })

})

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    register,
    login
}

export {
    authActions,
    authReducer
}
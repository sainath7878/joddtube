const initialState = {
    encodedToken: null,
}
const authReducer = (authState, { type, payload }) => {
    switch (type) {
        case "SET_USER":
            return { ...authState, encodedToken: payload.encodedToken }
        default:
            return authState
    }
}

export { authReducer, initialState }
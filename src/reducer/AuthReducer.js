const initialState = {
    encodedToken: null,
    loading: false
}
const authReducer = (authState, { type, payload }) => {
    switch (type) {
        case "SET_USER":
            return { ...authState, encodedToken: payload.encodedToken }
        case "SET_LOADER":
            return { ...authState, loading: payload.loading }
        default:
            return authState
    }
}

export { authReducer, initialState }
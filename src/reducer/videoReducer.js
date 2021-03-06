const initialVideoState = {
    likedVideos: [],
    watchLaterVideos: [],
    historyVideos: [],
}

const videoReducer = (videoState, { type, payload }) => {
    switch (type) {
        case "SET_LIKED_VIDEOS":
            return { ...videoState, likedVideos: payload.likedVideos }
        case "SET_WATCHLATER_VIDEOS":
            return { ...videoState, watchLaterVideos: payload.watchLaterVideos }
        case "SET_HISTORY_VIDEOS":
            return { ...videoState, historyVideos: payload.historyVideos }
        default:
            throw Error("Undefined Action")
    }
}

export { initialVideoState, videoReducer }
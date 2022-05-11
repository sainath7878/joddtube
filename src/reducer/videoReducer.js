const initialVideoState = {
    likedVideos: [],
    watchLaterVideos: [],
    history: [],
    playlist: []
}

const videoReducer = (videoState, { type, payload }) => {
    switch (type) {
        case "SET_LIKED_VIDEOS":
            return { ...videoState, likedVideos: payload.likedVideos }
        case "SET_WATCHLATER_VIDEOS":
            return { ...videoState, watchLaterVideos: payload.watchLaterVideos }
        default:
            throw Error("Undefined Action")
    }
}

export { initialVideoState, videoReducer }
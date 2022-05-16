import { PlayListModal } from "components"

const initialPlayListState = {
    playlists: []
}

const playListReducer = (playListState, { type, payload }) => {
    switch (type) {
        case "SET_PLAYLISTS":
            return { ...playListState, playlists: payload.playlist }
        case "MANAGE_PLAYLISTS":
            return { ...playListState, playlists: playListState.playlists.map(item => item._id === payload.playlist._id ? payload.playlist : item) }
        default:
            throw new Error("Undefined action")
    }
}

export { initialPlayListState, playListReducer };
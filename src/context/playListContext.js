import axios from "axios";
import { useState } from "react";
import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";
import { initialPlayListState, playListReducer } from "reducer/playListReducer"
import { useAuth } from "./authContext";

const PlayListContext = createContext()

function PlayListProvider({ children }) {

    const [showPlayListModal, setShowPlayListModal] = useState({
        state: false,
        video: {}
    })
    const [playListData, setPlayListData] = useState({
        title: "",
        description: ""
    });

    const [playListState, playListDispatch] = useReducer(playListReducer, initialPlayListState)

    const { authState: { encodedToken } } = useAuth();

    const createPlayListHandler = async ({ title, description }, video = {}) => {
        try {
            const response = await axios.post("/api/user/playlists",
                { playlist: { title, description } },
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 201) {
                playListDispatch({ type: "SET_PLAYLISTS", payload: { playlist: response.data.playlists } })
                if (Object.keys(video).length > 0) {
                    addVideoToPlaylistHandler(video, response.data.playlists[response.data.playlists.length - 1]._id);
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const deletePlayListHandler = async ({ _id }) => {
        try {
            const response = await axios.delete(`/api/user/playlists/${_id}`,
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            playListDispatch({ type: "SET_PLAYLISTS", payload: { playlist: response.data.playlists } })
            toast.info("Playlist deleted");
        }
        catch (err) {
            console.log(err.response.data.errors[0])
        }
    }

    const addVideoToPlaylistHandler = async (video, playListId) => {
        try {
            const response = await axios.post(`/api/user/playlists/${playListId}`,
                { video },
                {
                    headers: {
                        authorization: encodedToken
                    },
                }
            )
            if (response.status === 201) {
                playListDispatch({ type: "MANAGE_PLAYLISTS", payload: { playlist: response.data.playlist } })
                toast.success(`Added video to ${response.data.playlist.title}`)
            }
        }
        catch (err) {
            console.log(err.response.data.errors[0])
        }
    }

    const deleteVideoFromPlayListHandler = async (videoId, playlistId) => {
        try {
            const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`,
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 200) {
                playListDispatch({ type: "MANAGE_PLAYLISTS", payload: { playlist: response.data.playlist } })
                toast.error("Video deleted")
            }
        }
        catch (err) {
            console.log(err.response.data.errors[0])
        }
    }

    return (
        <PlayListContext.Provider value={{ playListState, playListDispatch, showPlayListModal, setShowPlayListModal, playListData, setPlayListData, createPlayListHandler, deletePlayListHandler, addVideoToPlaylistHandler, deleteVideoFromPlayListHandler }}>
            {children}
        </PlayListContext.Provider>
    )
}

const usePlayList = () => useContext(PlayListContext)

export { PlayListProvider, usePlayList }

import axios from "axios";
import { createContext, useContext, useReducer } from "react"
import { toast } from "react-toastify";
import { initialVideoState, videoReducer } from "reducer/videoReducer";
import { useAuth } from "./authContext";

const VideoContext = createContext();

function VideoProvider({ children }) {

    const [videoState, videoDispatch] = useReducer(videoReducer, initialVideoState);

    const { authState: { encodedToken } } = useAuth();


    const likeHandler = async (video) => {
        if (encodedToken) {
            try {
                const response = await axios.post(
                    "/api/user/likes",
                    { video },
                    {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                );
                if (response.status === 201) {
                    videoDispatch({
                        type: "SET_LIKED_VIDEOS",
                        payload: { likedVideos: response.data.likes },
                    });
                    toast.success("Added to Liked Videos");
                }
            } catch (err) {
                console.log(err);
                toast.error(err.response.data.errors[0])
            }
        }
        else {
            toast.info("Please Login");
        }
    };

    const unLikeHandler = async (video) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/likes/${video._id}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                });
                if (response.status === 200) {
                    videoDispatch({
                        type: "SET_LIKED_VIDEOS",
                        payload: { likedVideos: response.data.likes },
                    });
                    toast.error("Removed from Liked Videos");
                }
            } catch (err) {
                console.log(err);
                toast.error(err.response.data.errors[0])
            }
        }
        else {
            toast.info("Please Login")
        }

    };

    const addToWatchLaterHandler = async (video) => {
        if (encodedToken) {
            try {
                const response = await axios.post("/api/user/watchlater",
                    { video },
                    {
                        headers: {
                            authorization: encodedToken
                        }
                    }
                )
                if (response.status === 201) {
                    videoDispatch({
                        type: "SET_WATCHLATER_VIDEOS",
                        payload: { watchLaterVideos: response.data.watchlater },
                    });
                    toast.success("Added to Watch Later")
                }
            }
            catch (err) {
                console.log(err);
                toast.error(err.response.data.errors[0]);
            }
        }
        else {
            toast.info("Please Login")
        }

    }

    const removeFromWatchlaterHandler = async (video) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/watchlater/${video._id}`,
                    {
                        headers: {
                            authorization: encodedToken
                        }
                    }
                )
                if (response.status === 200) {
                    videoDispatch({
                        type: "SET_WATCHLATER_VIDEOS",
                        payload: { watchLaterVideos: response.data.watchlater },
                    });
                    toast.error("Removed from Watch Later")
                }
            }
            catch (err) {
                console.log(err)
                toast.error(err.response.data.errors[0])
            }
        }
        else {
            toast.info("Please Login")
        }

    }

    const removeFromHistoryHandler = async (video) => {
        try {
            const response = await axios.delete(`/api/user/history/${video._id}`,
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 200) {
                videoDispatch({
                    type: "SET_HISTORY_VIDEOS",
                    payload: { historyVideos: response.data.history },
                });
                toast.error("Removed from History")
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.errors[0])
        }
    }

    const clearHistoryHandler = async () => {
        try {
            const response = await axios.delete("/api/user/history/all",
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 200) {
                videoDispatch({
                    type: "SET_HISTORY_VIDEOS",
                    payload: { historyVideos: response.data.history },
                });
                toast.error("History Cleared")
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.errors[0])
        }
    }


    return (
        <VideoContext.Provider value={{ videoState, videoDispatch, likeHandler, unLikeHandler, addToWatchLaterHandler, removeFromWatchlaterHandler, removeFromHistoryHandler, clearHistoryHandler }}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideos = () => useContext(VideoContext)

export { useVideos, VideoProvider }
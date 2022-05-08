import { createContext, useContext, useReducer } from "react"

const VideoContext = createContext();

function VideoProvider({ children }) {
    const [videoState, videoDispatch] = useReducer();
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
        {children}
    </VideoContext.Provider>
}

const useVideos = () => useContext(VideoContext)

export { useVideos, VideoProvider }
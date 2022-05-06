import { createContext, useContext, useReducer } from "react"

const VideoContext = createContext();

function VideoContext({ children }) {
    const [videoState, videoDispatch] = useReducer();
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
        {children}
    </VideoContext.Provider>
}

const useVideos = () => useContext(VideoContext)

export { useVideos, VideoContext }
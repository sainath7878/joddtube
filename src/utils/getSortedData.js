import { LATEST, OLDEST } from "constants/constants";

const getSortedData = (videos, sortBy) => {
    if (videos && videos.length > 0) {
        if (sortBy === LATEST) {
            return [...videos].sort((video1, video2) => new Date(video2.date) - new Date(video1.date));
        }
        else if (sortBy === OLDEST) {
            return [...videos].sort((video1, video2) => new Date(video1.date) - new Date(video2.date));
        }
    }
    return videos;
}

export { getSortedData };
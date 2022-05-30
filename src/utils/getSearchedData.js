const getSearchedData = (videos, search) => {
    if (search === "") {
        return videos;
    }
    else {
        return videos.filter(video => video.title.toLowerCase().includes(search.toLowerCase()))
    }
}

export { getSearchedData };
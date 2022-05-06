const getFilteredData = (videos, filters) => {
    if (filters === "All") {
        return videos;
    } else if (filters === "Valorant") {
        return videos.filter((item) => item.category === "valorant");
    } else if (filters === "GTA 5") {
        return videos.filter((item) => item.category === "gta");
    } else if (filters === "CS GO") {
        return videos.filter((item) => item.category === "csgo");
    } else if (filters === "BGMI") {
        return videos.filter((item) => item.category === "bgmi");
    }
};

export { getFilteredData }
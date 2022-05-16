const trimTitle = (titleText) => {
    let trimmedTitle = "";
    trimmedTitle = titleText.length > 50 ? titleText.substring(0, 45) + "..." : titleText;
    return trimmedTitle;
}

export { trimTitle };
const throttle = (callback, delay = 1000) => {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            callback.apply(context, args);
            flag = false;
            setTimeout(() => {
                console.log("from set timeout");
                flag = true;
            }, delay);
        }
    };
};

export { throttle };
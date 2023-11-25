let X = 0;
let Y = 0;

document.addEventListener("mousemove", (e) => {
    X = e.clientX;
    Y = e.clientY;
});

export default {
    get X() {
        return X;
    },
    get Y() {
        return Y;
    }
};

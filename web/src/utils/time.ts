export const getTimeFromTimeStamp = (currentTime: number) => {
    let date = new Date(currentTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay();
    let dayOfMonth = date.getDate();
    let month = date.getMonth();
    return { hours, minutes, day, dayOfMonth, month };
};

export const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
export const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

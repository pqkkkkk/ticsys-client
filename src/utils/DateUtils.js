
export const ConvertDateStringToDateWithMonthName = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return [year, monthNames[month-1], day];
}
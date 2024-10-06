export const formatDate = (dateToBeformated) => {
    const dateStr = dateToBeformated;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    console.log(formattedDate); // December 2, 6666
    return formattedDate;

}

export const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const convertDate= (dateStr) => {
    const fixedDate = new Date(dateStr)
    const newDate = fixedDate.getDate();
    const year = fixedDate.getFullYear();
    const month = fixedDate.getMonth();

    return (
      <>
        {month + 1}/{newDate + 1}/{year}
      </>
    );
}

export default convertDate
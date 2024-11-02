const shortFormatdate = (date = Date.now())=>{
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short'
  });

  return {
      date: formattedDate,
  };
}
export default shortFormatdate
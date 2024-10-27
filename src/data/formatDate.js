const formatDate = (date = Date.now()) => {
  const newDate = new Date(date);
  
  const options = {
    day: "numeric",
    month: "short",  // Use "short" for abbreviated month (e.g., Jan, Feb)
    year: "numeric"  // Full year (e.g., 2024)
  };
  
  // Format the date with the options
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(newDate);

  return {
      date: formattedDate,
  };
};

export default formatDate;
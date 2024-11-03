function filterTasks(tasks) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of the week
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the month

  const filters = {
    today: [],
    thisWeek: [],
    thisMonth: [],
  };

  tasks.forEach((task) => {
    if (!task.duedate) {
      // Task with no due date; include it in all filters
      filters.today.push(task);
      filters.thisWeek.push(task);
      filters.thisMonth.push(task);
    } else {
      const dueDate = new Date(task.duedate);

      // Check if it's due today
      if (dueDate.toDateString() === today.toDateString()) {
        filters.today.push(task);
      }

      // Check if it's due this week
      if (dueDate >= startOfWeek && dueDate <= endOfWeek) {
        filters.thisWeek.push(task);
      }

      // Check if it's due this month
      if (dueDate >= startOfMonth && dueDate <= endOfMonth) {
        filters.thisMonth.push(task);
      }
    }
  });

  return filters;
}
 export default filterTasks
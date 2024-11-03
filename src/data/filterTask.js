function filterTasks(tasks, filterType) {
  const today = new Date();

  // Calculate the start and end of the week (Monday to Sunday)
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday (0), go back 6 days
  startOfWeek.setDate(today.getDate() + mondayOffset);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  // Calculate the start and end of the month (1st to last day)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month

  // Create a filtered array based on the filterType
  const filteredTasks = [];

  tasks.forEach((task) => {
    const dueDate = task.duedate ? new Date(task.duedate) : null;

    // Push tasks into the filtered array based on the filterType
    if (!dueDate) {
      // If no due date, include in all filters
      filteredTasks.push(task);
    } else {
      if (filterType === 'today' && dueDate.toDateString() === today.toDateString()) {
        filteredTasks.push(task);
      }
      if (filterType === 'thisWeek' && dueDate >= startOfWeek && dueDate <= endOfWeek) {
        filteredTasks.push(task);
      }
      if (filterType === 'thisMonth' && dueDate >= startOfMonth && dueDate <= endOfMonth) {
        filteredTasks.push(task);
      }
    }
  });

  return filteredTasks;
}
export default filterTasks
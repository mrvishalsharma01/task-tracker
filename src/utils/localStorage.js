const TASKS_STORAGE_KEY = 'task-tracker-tasks';
const THEME_STORAGE_KEY = 'task-tracker-theme';

export const loadTasks = () => {
  try {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};

// Theme management
export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

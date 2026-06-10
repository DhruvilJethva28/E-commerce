import create from 'zustand';

const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem('darkMode') === 'true' || false,
  
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    localStorage.setItem('darkMode', newDarkMode);
    return { isDarkMode: newDarkMode };
  }),
  
  setDarkMode: (isDarkMode) => {
    localStorage.setItem('darkMode', isDarkMode);
    set({ isDarkMode });
  },
}));

export default useThemeStore;

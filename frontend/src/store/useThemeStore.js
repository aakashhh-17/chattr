import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('chattr-theme') || 'coffee',
setTheme: (theme)=>{
  localStorage.setItem('chattr-theme', theme);
  set({theme})
}
}))
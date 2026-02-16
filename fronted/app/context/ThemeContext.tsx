import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ================================
   TIPOS
================================ */
export type Theme = {
  background: string;
  card: string;
  text: string;
  subText: string;
  primary: string;
  income: string;
  expense: string;
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

/* ================================
   TEMAS
================================ */
const lightTheme: Theme = {
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  subText: '#6B7280',
  primary: '#2563EB',
  income: '#16A34A',
  expense: '#DC2626',
};

const darkTheme: Theme = {
  background: '#0B132B',
  card: '#1C2541',
  text: '#FFFFFF',
  subText: '#BFC9D9',
  primary: '#F4C430',
  income: '#2ECC71',
  expense: '#E63946',
};

/* ================================
   CONTEXT
================================ */
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/* ================================
   PROVIDER
================================ */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  // 🔹 carregar tema salvo
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
      }
    };
    loadTheme();
  }, []);

  // 🔹 alternar e salvar
  const toggleTheme = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await AsyncStorage.setItem(
      '@theme',
      newValue ? 'dark' : 'light'
    );
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ================================
   HOOK SEGURO
================================ */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider'
    );
  }

  return context;
}

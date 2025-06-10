import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeColors = {
  titleColor: string;
  textColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  separatorColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
};

const defaultTheme: ThemeColors = {
  titleColor: '#CCCCCC',
  textColor: '#444444',
  buttonBackgroundColor: '#244f93',
  buttonTextColor: '#CCCCCC',
  separatorColor: '#0097C8',
  headerBackgroundColor: '#CCCCCC',
  headerTextColor: '#444444',
};

type ThemeContextType = {
  colors: ThemeColors;
  setColors: (colors: ThemeColors) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultTheme,
  setColors: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColorsState] = useState<ThemeColors>(defaultTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedColors = await AsyncStorage.getItem('APP_THEME_COLORS');
      if (savedColors) {
        setColorsState(JSON.parse(savedColors));
      }
    };
    loadTheme();
  }, []);

  const setColors = async (newColors: ThemeColors) => {
    setColorsState(newColors);
    await AsyncStorage.setItem('APP_THEME_COLORS', JSON.stringify(newColors));
  };

  return (
    <ThemeContext.Provider value={{ colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { useEffect, useState } from 'react';
import storage from '@/utils/storage.utils';

type TTheme = 'light' | 'dark';

const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(
    storage.get('theme', 'light') as TTheme
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    storage.set('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
export default useTheme;

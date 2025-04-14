import Button from '@/ui/Button';
import useTheme from './useTheme';
import { LightIcon, DarkIcon } from '@/components/Icons';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      className="rounded-full p-2"
      variant={'brand'}
      size={'icon'}
    >
      {theme === 'light' ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};
export default ThemeToggle;

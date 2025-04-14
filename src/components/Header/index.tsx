import ThemeToggle from '@/components/Theme/ThemeToggle';

const Header = () => {
  return (
    <header className="w-full px-4 flex items-center justify-between">
      <h1 className="text-primary text-3xl">
        Welcome to the{' '}
        <span className="text-brand-primary">Cadmus assestment</span>
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};
export default Header;

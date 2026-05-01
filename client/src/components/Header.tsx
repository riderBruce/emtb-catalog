import ThemeToggleButton from "./ThemeToggleButton";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const Header = ({ theme, onToggleTheme }: Props) => {
  return (
    <header className="">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1>E-Mountain Bike Catalog</h1>
          <ThemeToggleButton theme={theme} onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;

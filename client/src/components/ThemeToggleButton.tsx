interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const ThemeToggleButton = ({ theme, onToggleTheme }: Props) => {
  return (
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={onToggleTheme}
      type="button"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggleButton;

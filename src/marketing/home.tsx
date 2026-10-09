import { useTheme } from '@/providers/ThemeProvider';
export default function HomePage() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return <div>HomePage</div>;
}

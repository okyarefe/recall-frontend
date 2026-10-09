import { useTheme } from '@/providers/ThemeProvider';
export default function HomePage() {
  const { theme, setTheme, toggleTheme } = useTheme();
  console.log('Theme', theme);
  console.log('Set Theme', setTheme);
  return <div>HomePage</div>;
}

import { Outlet } from 'react-router';

export default function Dashboard() {
  return (
    <div>
      Welcome to dashboard :D
      <Outlet></Outlet>
    </div>
  );
}

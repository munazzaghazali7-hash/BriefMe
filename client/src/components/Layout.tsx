import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-brief-gray-bg overflow-hidden flex-col md:flex-row">
      <main className="flex-1 overflow-y-auto order-1 md:order-2 pb-[60px] md:pb-0">
        <Outlet />
      </main>
      <div className="order-2 md:order-1">
        <Sidebar />
      </div>
    </div>
  );
}

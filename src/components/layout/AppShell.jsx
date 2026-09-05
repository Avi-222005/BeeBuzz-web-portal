import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import BottomBar from './BottomBar'
import Toast from '../ui/Toast'

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-white text-zinc-900 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 bg-white">
          <div className="max-w-content mx-auto">
            <Outlet />
          </div>
        </main>
        <BottomBar />
      </div>
      <Toast />
    </div>
  )
}

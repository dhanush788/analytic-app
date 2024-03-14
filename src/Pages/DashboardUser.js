import { useState } from 'react'
import { MapPinIcon, ChartBarIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import { ArrowTrendingUpIcon } from '@heroicons/react/20/solid'
import { auth } from '../firebase/config'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'

const colors = {
  textColor: 'text-white',
  textColorInactive: 'text-gray-400',
  textColorHover: 'hover:text-white',
  textColorActive: 'text-indigo-400',
  bgSidebar: 'bg-gray-900',
  bgSidebarHover: 'hover:bg-gray-800',
  bgSidebarActive: 'bg-gray-800',
  bgProfile: 'bg-gray-800',
  borderSidebar: 'border-gray-700',
  borderProfile: 'border-gray-700',
  bgSearch: 'bg-transparent',
  borderSearch: 'border-gray-700',
  bgHeader: 'bg-gray-900',
  borderHeader: 'border-white/5',
  bgActivityHeader: 'bg-gray-700',
  borderActivityHeader: 'border-white/10',
  bgActivityItem: 'bg-gray-700',
  borderActivityItem: 'border-white/5',
}

const navigation = [
  { name: 'Route Analysis', href: '#', icon: MapPinIcon, current: false },
  { name: 'Trip Analysis', href: '#', icon: ChartBarIcon, current: false },
  { name: 'User Behaviour', href: '#', icon: ChartPieIcon, current: true },
  { name: 'Forecasting', href: '#', icon: ArrowTrendingUpIcon, current: false },

]




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log(auth.currentUser)
  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} colors={colors} navigation={navigation} teams={[]} />
        <div className="xl:pl-72">
          <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <header>
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  FolderIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {auth} from '../firebase/config'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import SecNav from '../component/SecNav'
import Form from '../component/Form'

// Define color palette
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
  { name: 'Blah1', href: '#', icon: FolderIcon, current: false },
  { name: 'Add an user', href: '#', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
]

const teams = [
  { id: 1, name: 'Uber', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Ola', href: '#', initial: 'P', current: false },
]

const secondaryNavigation = [
  { name: 'Add a user', href: '#', current: true },
  { name: 'Users List', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log(auth.currentUser)
  return (
    <>
      <div>
        <Sidebar/>
        <div className="xl:pl-72">
          {/* Sticky search header */}
          <Searchbar/>


          <main>
            <header>
              {/* Secondary navigation */}
              <SecNav secondaryNavigation={secondaryNavigation} />
              <Form/>
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
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


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log(auth.currentUser)
  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="xl:pl-72">
          {/* Sticky search header */}
          <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>


          <main>
            <header>
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
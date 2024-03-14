import {  useContext, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import SecNav from '../component/SecNav'
import Form from '../component/Form'
import { OptionsContext } from '../context/DashbardContext'


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
  const {colors} = useContext(OptionsContext)
  const {navigation} = useContext(OptionsContext)
  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} colors={colors} navigation={navigation} teams={teams} />
        <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="xl:pl-72">

          <main>
            <header>
              {/* Secondary navigation */}
              <SecNav secondaryNavigation={secondaryNavigation} />
              <Form />
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
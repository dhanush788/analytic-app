import { useContext, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {colors} = useContext(OptionsContext)
  const {navigation} = useContext(OptionsContext)

  return (
    <>
      <div>
        <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} colors={colors} navigation={navigation} teams={[]} />
        <div className="xl:pl-72">
          <main>
            <header>
              <Analysis />
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
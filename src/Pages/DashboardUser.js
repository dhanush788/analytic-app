import { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [current, setCurrent] = useState("Route Analysis")
  const { colors } = useContext(OptionsContext)
  const { navigation } = useContext(OptionsContext)

  useEffect(() => {

    navigation.map((item) => {
      if (item.current === true) {
        setCurrent(item.name)
      }
    })
  }, [navigation])

  return (
    <>
      <div>
        <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} colors={colors} navigation={navigation} teams={[]} />
        <div className="xl:pl-72">
          <main>
            <header>
              {
                (current === "Route Analysis" || current === "Trip Analysis" || current === "User Behaviour" || current === "Forecasting") &&
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                  < Analysis />
                </>
              }
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
import { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'
import { DateRangePicker } from 'react-date-range'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [current, setCurrent] = useState("Route Analysis")
  const { colors } = useContext(OptionsContext)
  const { navigation } = useContext(OptionsContext)
  const { uploadedData, setUploadedData } = useContext(OptionsContext)
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
});

  useEffect(() => {

    navigation.map((item) => {
      if (item.current === true) {
        setCurrent(item.name)
      }
    })
  }, [navigation])

  const handleSelect = (ranges) => {
    setSelectionRange({
        ...selectionRange,
        ...ranges.selection
    });
};

  return (
    <>
      <div>
        <Searchbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} colors={colors} navigation={navigation} teams={[]} />
        <div className="xl:pl-72">
          <main>
            <header>
              {
                (current === "Upload Data") &&
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                  < Analysis setUploadedData={setUploadedData} />
                </>
              }
              {
                !uploadedData && (current === "Route Analysis" || current === "Trip Analysis" || current === "User Behaviour" || current === "Forecasting") &&
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                  <div className="mt-8 ml-8">
                    <p className="text-gray-900">No data available for analysis</p>
                    <p className="text-gray-900">Please upload data to start analysis</p>
                  </div>
                </>
              }
              {
                uploadedData && (current === "Route Analysis" || current === "Trip Analysis" || current === "User Behaviour" || current === "Forecasting") &&
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                  <div className="mt-8 ml-8">
                    <p className="text-gray-900">Result is ready</p>
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                    />
                  </div>
                </>
              }
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
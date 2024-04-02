import { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'
import { DateRangePicker } from 'react-date-range'


const Form = ({current ,setLoading,setResult}) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges) => {
    setSelectionRange({
      ...selectionRange,
      ...ranges.selection
    });
    console.log(selectionRange)
  };

  const handleResult = () => {
    setLoading(true)
    const startDate = selectionRange.startDate.toISOString().slice(0, 10);
    const endDate = selectionRange.endDate.toISOString().slice(0, 10);

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    setResult(true)
    setLoading(false)
  }

  return (
    <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                  <div className="mt-8 ml-8">
                    <p className="text-gray-900">File is uploaded.</p><br /><br />
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6 mr-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                      Cancel
                    </button>
                    <button
                      onClick={handleResult}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get Result
                    </button>
                  </div>
                </>
  )
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [current, setCurrent] = useState("Route Analysis")
  const { colors } = useContext(OptionsContext)
  const { navigation } = useContext(OptionsContext)
  const [loading, setLoading] = useState(false)
  const { uploadedData, setUploadedData } = useContext(OptionsContext)
  const [result,setResult] = useState(false)


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
                !result && uploadedData && (current === "Route Analysis" || current === "Trip Analysis" || current === "User Behaviour" || current === "Forecasting") &&
                <Form current={current} setLoading={setLoading} setResult={setResult} />
              }
              
            </header>
          </main>
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div aria-label="Loading..." role="status" className="flex flex-col items-center space-y-4">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}
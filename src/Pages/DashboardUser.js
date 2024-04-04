import { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'
import { DateRangePicker } from 'react-date-range'
import axios from 'axios'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const Form = ({ current, setLoading, setResult }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [error, setError] = useState("")
  const [selectedPlace, setSelectedPlace] = useState("Place1")
  const [selectedService, setSelectedService] = useState("Place1")

  const handleSelect = (ranges) => {
    setSelectionRange({
      ...selectionRange,
      ...ranges.selection
    });
    console.log(selectionRange)
  };

  const handleResult = async () => {
    setLoading(true)
    const startdate = selectionRange.startDate.toISOString().slice(0, 10).toString();
    const enddate = selectionRange.endDate.toISOString().slice(0, 10).toString();
    try {
      const response = await axios.post('http://localhost:8000/traffic_analysis', {
        start_date: startdate,
        end_date: enddate,
        borough: selectedPlace,
        brand: selectedService,
        k: 5,
        n: 5
      });
      setResult(response.data);
    } catch (error) {
      setError(error.message);
    }

    console.log("Start Date:", startdate);
    console.log("End Date:", enddate);
    setLoading(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
      <div className="mt-8 ml-8 flex flex-col">
        <p className="text-gray-900">File is uploaded.</p><br /><br />
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
        <div className='flex gap-3'>
          <h2 className="text-base font-semibold leading-7 text-gray-900 my-auto capitalize">Pick a place</h2>
          <select
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 mr-auto my-3"
          >
            <option value="">Select a place</option>
            <option value="Queens">Queens</option>
            <option value="Bronx">Bronx</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Staten Island">Staten Island</option>
            <option value="EWR">EWR</option>
          </select>
        </div>
        <div className='flex gap-3'>
          <h2 className="text-base font-semibold leading-7 text-gray-900 capitalize my-auto">Pick a service</h2>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 mr-auto my-3"
          >
            <option value="">Select service</option>
            <option value="Uber">Uber</option>
            <option value="Lyft">Lyft</option>
          </select>
        </div>
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
  const [result, setResult] = useState(false)
  const [result2, setResult2] = useState(false)


  useEffect(() => {

    navigation.map((item) => {
      if (item.current === true) {
        setCurrent(item.name)
      }
    })
  }, [navigation])
  console.log(result, "result")


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
                !result && uploadedData && (current === "Route Analysis" || current === "Trip Analysis" || current === "User Behaviour") &&
                <Form current={current} setLoading={setLoading} setResult={setResult} />
              }
              {
                !result2 && uploadedData && (current === "Forecasting") &&
                <Form current={current} setLoading={setLoading} setResult={setResult2} />
              }
              {result && (current !== "Forecasting" && current !== "Upload Data") && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">Result</h1>
                  {current === "Route Analysis" && (
                    <>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">most common pickup point:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.most_common_pu_zone}</h2>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">most common drop off point:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.most_common_do_zone}</h2>
                      <img src='http://localhost:8000/images/map.jpg?v=2' alt='map' className='w-1/2 h-1/2' />
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">top-k most common route:</h2>
                      <div className='flex flex-col'>
                        {result.most_common_routes.map((route, index) => (
                          <h2 key={index} className="text-sm font-medium leading-7 text-gray-600 ml-8">
                            {route}
                          </h2>
                        ))}
                      </div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">top-k least common route:</h2>
                      <div className='flex flex-col'>
                        {result.least_common_routes.map((route, index) => (
                          <h2 key={index} className="text-sm font-medium leading-7 text-gray-600 ml-8">
                            {route}
                          </h2>
                        ))}
                      </div>
                      <img src='http://localhost:8000/images/traffic.jpg?v=2' alt='map' className='w-1/2 h-1/2' />
                    </>
                  )}
                  {current === "Trip Analysis" && (
                    <>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Daily aggregate revenue:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.aggregate_driver_pay}</h2>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Daily aggregate trip miles:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.aggregate_miles}</h2>
                    </>
                  )}
                  {current === "User Behaviour" && (
                    <>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Top-n peak traffic times:</h2>
                      <img src='http://localhost:8000/images/peak_traffic.jpg?v=2' alt='map' className='w-1/2 h-1/2' />
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">{result.title}:</h2>
                      {result.data.map((item, index) => (
                        <h2 key={index} className="text-sm font-medium leading-7 text-gray-600 ml-8">
                          {item.Peak_Hours} : {item.Trip_Count}
                        </h2>
                      ))}

                    </>
                  )}
                </>
              )
              }
              {
                result2 && (current === "Forecasting") && (
                  <></>
                )}

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
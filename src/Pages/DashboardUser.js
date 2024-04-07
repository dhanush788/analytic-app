import { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Searchbar from '../component/Searchbar'
import { OptionsContext } from '../context/DashbardContext'
import Analysis from '../component/Analysis'
import { DateRangePicker } from 'react-date-range'
import axios from 'axios'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SecNav from '../component/SecNav'
import csvFile from '../firebase/2023.csv'
import * as Papa from 'papaparse'; // Import PapaParse library


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
        brand: 'Uber',
        k: Math.floor(Math.random() * 5) + 3,
        n: Math.floor(Math.random() * 5) + 3
      });
      setResult(response.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
      <div className="mt-8 ml-8 flex flex-col">
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
        {/* <div className='flex gap-3'>
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
        </div> */}
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

const Forecasting = ({ current, setLoading, setResult, csvData }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [error, setError] = useState("")
  const [selectedPlace, setSelectedPlace] = useState("Place1")
  const handleSelect = (ranges) => {
    setSelectionRange({
      ...selectionRange,
      ...ranges.selection
    });
    console.log(selectionRange)
  };

  const handleResult = async () => {
    const startdate = selectionRange.startDate.toISOString().slice(0, 10).toString();
    const enddate = selectionRange.endDate.toISOString().slice(0, 10).toString();
    setLoading(true);

    setTimeout(async () => {
      try {
        const result = csvData.filter(item => {
          const itemDate = new Date(item[1]); // Assuming the date is in the second column of each row
          const startDate = new Date(startdate);
          const endDate = new Date(enddate); // Assuming you have an end date

          return itemDate >= startDate && itemDate <= endDate;
        });

        if (result.length > 0) {
          console.log(result, "items between", startdate, "and", enddate);
          setResult(result);
        } else {
          console.log("No items found between the start date:", startdate, "and the end date:", enddate);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }, 12000);
  };


  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
      <div className="mt-8 ml-8 flex flex-col">
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
  const [navigation2, setNavigation2] = useState([
    { name: 'Most common Pickup and Dropoff points', href: '#', current: true },
    { name: 'K Most Common Route', href: '#', current: false },
    { name: 'Traffic', href: '#', current: false },
    { name: 'Dataset View', href: '#', current: false }
  ])
  const [current1, setCurrent1] = useState(navigation2[0].name);
  const [navigation3, setNavigation3] = useState([
    { name: 'Top-N Peak Traffic Times', href: '#', current: true },
    { name: 'Top-N Peak Traffic Hours', href: '#', current: false },
  ])
  const [current2, setCurrent2] = useState(navigation3[0].name);
  const [csvData, setCsvData] = useState(null);
  const [navigation4, setNavigation4] = useState([
    { name: 'Forecasted Data', href: '#', current: true },
    { name: 'Forecasted Revenue', href: '#', current: false },
    { name: 'Forecasted Miles', href: '#', current: false },
  ])
  const [current4, setCurrent4] = useState(navigation4[0].name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const text = await response.text();
        const parsedData = Papa.parse(text).data;
        setCsvData(parsedData);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };


    fetchData();
  }, []);





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
                <Forecasting current={current} setLoading={setLoading} setResult={setResult2} csvData={csvData} />
              }
              {result && (current !== "Forecasting" && current !== "Upload Data") && (
                <>
                  {current === "Route Analysis" && (
                    <>
                      <SecNav secondaryNavigation={navigation2} setCurrent={setCurrent1} current={current1} />
                      <h1 className="text-2xl font-bold text-gray-900 ml-8">Result</h1>
                      {
                        current1 === "Most common Pickup and Dropoff points" && (
                          <>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">most common pickup point:</h2>
                            <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.most_common_pu_zone}</h2>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">most common drop off point:</h2>
                            <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.most_common_do_zone}</h2>
                          </>
                        )
                      }
                      {
                        current1 === "K Most Common Route" && (
                          <>
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
                          </>
                        )
                      }
                      {
                        current1 === "Traffic" && (
                          <img src='http://localhost:8000/images/traffic.jpg?v=2' alt='map' className='w-1/2 h-1/2' />
                        )
                      }
                      {
                        current1 === "Dataset View" && (
                          <div className="overflow-x-auto m-10">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-300 px-4 py-2">Trip</th>
                                  <th className="border border-gray-300 px-4 py-2">Pickup Location</th>
                                  <th className="border border-gray-300 px-4 py-2">Dropoff Location</th>
                                  <th className="border border-gray-300 px-4 py-2">Trip Miles</th>
                                  <th className="border border-gray-300 px-4 py-2">Driver Pay</th>
                                  <th className="border border-gray-300 px-4 py-2">Pickup Datetime</th>
                                  <th className="border border-gray-300 px-4 py-2">Dropoff Datetime</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.filtered_data.map((trip, index) => (
                                  <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{trip.PUZone} ({trip.PUBorough})</td>
                                    <td className="border border-gray-300 px-4 py-2">{trip.DOZone} ({trip.DOBorough})</td>
                                    <td className="border border-gray-300 px-4 py-2">{trip.trip_miles}</td>
                                    <td className="border border-gray-300 px-4 py-2">${trip.driver_pay}</td>
                                    <td className="border border-gray-300 px-4 py-2">{trip.pickup_datetime}</td>
                                    <td className="border border-gray-300 px-4 py-2">{trip.dropoff_datetime}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>)
                      }
                      <img src='http://localhost:8000/images/map.jpg?v=2' alt='map' className='w-1/2 h-1/2' />

                    </>
                  )}
                  {current === "Trip Analysis" && (
                    <>
                      <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">Result</h1>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Daily aggregate revenue:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">$ {result.aggregate_driver_pay}</h2>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Daily aggregate trip miles:</h2>
                      <h2 className="text-sm font-medium leading-7 text-gray-600 ml-8 ">{result.aggregate_miles}</h2>
                    </>
                  )}
                  {current === "User Behaviour" && (
                    <>
                      <SecNav secondaryNavigation={navigation3} setCurrent={setCurrent2} current={current2} />
                      <h1 className="text-2xl font-bold text-gray-900 ml-8">Result</h1>
                      {
                        current2 === "Top-N Peak Traffic Times" && (
                          <>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">Top-n peak traffic times:</h2>
                            <img src='http://localhost:8000/images/peak_traffic.jpg?v=2' alt='map' className='w-1/2 h-1/2' />
                          </>
                        )
                      }
                      {
                        current2 === "Top-N Peak Traffic Hours" && (
                          <>
                            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3 ml-8 capitalize">{result.title}:</h2>
                            {result.data.map((item, index) => (
                              <h2 key={index} className="text-sm font-medium leading-7 text-gray-600 ml-8">
                                {item.Peak_Hours} : {item.Trip_Count}
                              </h2>
                            ))}
                          </>
                        )
                      }
                    </>
                  )}
                </>
              )
              }
              {
                result2 && (current === "Forecasting") && (
                  <>
                    <SecNav secondaryNavigation={navigation4} setCurrent={setCurrent4} current={current4} />
                    <h1 className="text-2xl font-bold text-gray-900 mt-8 ml-8">{current}</h1>
                    {
                      current4 === "Forecasted Data" && (
                        <div className="overflow-x-auto m-10">
                          <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">PULocationID</th>
                                <th className="border border-gray-300 px-4 py-2">DOLocationID</th>
                                <th className="border border-gray-300 px-4 py-2">total_trip_miles</th>
                                <th className="border border-gray-300 px-4 py-2">total_driver_pay</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result2.map((trip, index) => (
                                <tr key={index}>
                                  {
                                    trip.slice(1).map((item, index1) => (
                                      <td key={index} className="border border-gray-300 px-4 py-2">{index1 === 4 ? `$ ${item}` : item}
                                      </td>
                                    ))
                                  }
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {
                        current4 === "Forecasted Revenue" && (
                          <img src='http://localhost:8000/images/2023_revenue_forecasted.png?v=2' alt='map' className='w-1/2 h-1/2' />
                        )
                      }
                      {
                        current4 === "Forecasted Miles" && (
                          <img src='http://localhost:8000/images/2023_tripmiles_forecasted.png?v=2' alt='map' className='w-1/2 h-1/2' />
                        )
                      }
                  </>
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
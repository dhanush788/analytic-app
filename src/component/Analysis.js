import React, { useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const Analysis = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    const form = useRef()
    const [formData, setFormData] = useState({
        'startDate': '',
        'endDate': '',
        'username': '',
        'activity': '',
        'file': '',
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        console.log('Uploading file:', selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const handleSelect = (ranges) => {
        setSelectionRange({
            ...selectionRange,
            ...ranges.selection
        })
    }


    return (
        <form ref={form} onSubmit={handleSubmit}>
            <div className="space-y-12 lg:m-8 m-4">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Enter the file to be uploaded.</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information cannot be changed later so be careful what you share.
                    </p>
                    <div class="flex items-center justify-center w-full">
                        {/* file upload */}
                        {
                            selectedFile ? (
                                <div className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <img src={URL.createObjectURL(selectedFile)} alt="file" className="w-full h-64 rounded-lg" />
                                </div>
                            ) : (
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            )}
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Date picker</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Decide the range of Date to be choosed.</p>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />


                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default Analysis
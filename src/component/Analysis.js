import { set } from 'date-fns';
import React, { useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Analysis = ( {setUploadedData} ) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const form = useRef();
    const [formData, setFormData] = useState({
        'startDate': '',
        'endDate': '',
        'username': '',
        'activity': '',
        'file': '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.name.split('.').pop();
            if (fileType !== 'xlsx' && fileType !== 'xls') {
                setFileError('Please select a .xls or .xlsx file.');
            } else {
                setSelectedFile(file);
                setFileError('');
            }
        }
    };

    const handleUpload = () => {
        console.log('Uploading file:', selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setFileError('Please select a file.');
            return;
        }
        setLoading(true);
        setUploadedData(true);
    
        // Simulate loading for 10 seconds
        setTimeout(() => {
            // Handle form submission here
            console.log('Form submitted successfully');
            setLoading(false);
            setResult(true);
        }, 10000); // 10 seconds in milliseconds
    };
    

    const handleSelect = (ranges) => {
        setSelectionRange({
            ...selectionRange,
            ...ranges.selection
        });
    };

    return (
        <form ref={form} onSubmit={handleSubmit}>
            {!loading && !result && (
                <>
                    <div className="space-y-12 lg:m-8 m-4">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Enter the file to be uploaded.</h2>
                            {fileError && <p className="text-red-500">{fileError}</p>}
                            <div className="flex items-center justify-center w-full">
                                {/* file upload */}
                                {selectedFile ? (
                                    <div className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{selectedFile.name}</p>
                                    </div>
                                ) : (
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">.xls or .xlsx files only</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileChange} />
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
                </>
            )}
            {
                loading && (
                    <div className="mt-6 flex items-center m-8 gap-x-6">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Loading...</p>
                    </div>
                )
            }
            {
                result && (
                    <div className="mt-6 flex items-center m-8 gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Download
                        </button>
                    </div>
                )
            }
        </form>
    );
};

export default Analysis;

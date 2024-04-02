import React, { useRef, useState } from 'react';

const Analysis = ({ setUploadedData }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
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
        }, 1000); // 10 seconds in milliseconds
    };



    return (
        <form ref={form} onSubmit={handleSubmit}>
            {!result && (
                <>
                    <div className="space-y-12 lg:m-8 m-4">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Enter the file to be uploaded.</h2>
                            {fileError && <p className="text-red-500">{fileError}</p>}
                            <div className="flex items-center py-3 w-full">
                                {/* file upload */}
                                {selectedFile ? (
                                    <div className="flex items-center justify-center w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{selectedFile.name}</p>
                                    </div>
                                ) : (
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">.xls or .xlsx files only</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Date picker</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Decide the range of Date to be choosed.</p>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={handleSelect}
                            />
                        </div> */}
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6 mr-6">
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

            {
                result && (
                    // < !--Main modal -->
                    <div className=" overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full  h-modal md:h-full">
                        <div className="relative p-4 w-full h-full md:h-auto">
                            {/* <!-- Modal content --> */}
                            <div className="relative p-4 text-center bg-white rounded-lg w-full sm:p-5">
                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Success</span>
                                </div>
                                <p className="mb-4 text-lg font-semibold text-gray-900 ">Successfully uploaded the data.</p>
                                <p className="mb-4 text-sm text-gray-500 ">Your data has been successfully uploaded and is being processed.</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </form>
    );
};

export default Analysis;

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


export default function Form() {
  const [formData, setFormData] = useState({
    'username': '',
    'permission1': false,
    'permission2': false,
    'permission3': false,
  });

  const form = useRef()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const encodedPairs = [];
      for (const key in formData) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(formData[key]);
      encodedPairs.push(`${encodedKey}=${encodedValue}`);
    }
      const encodedFormData = encodedPairs.join('&');
      const encryptedFormData = btoa(encodedFormData);
      console.log(form.current)


      // emailjs
      // .sendForm('service_j7phaji', 'template_djttdck', form.current, {
      //   publicKey: 'REIRbQwo-omARmAi5',
      // })
      // .then(
      //   () => {
      //     console.log('SUCCESS!');
      //   },
      //   (error) => {
      //     console.log('FAILED...', error.text);
      //   },
      // );


  };
  

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div className="space-y-12 lg:mx-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Enter User Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information cannot be changed later so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">@analytics.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Permissions</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Decide what all Permissions you want to give to the user.</p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Permissions</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="permission1"
                      name="permission1"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={formData.permission1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="permission1" className="font-medium text-gray-900">
                      Permission 1
                    </label>
                    <p className="text-gray-500">Option 1</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="permission2"
                      name="permission2"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={formData.permission2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="permission2" className="font-medium text-gray-900">
                      Permission 2
                    </label>
                    <p className="text-gray-500">Option 2</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="permission3"
                      name="permission3"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={formData.permission3}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="permission3" className="font-medium text-gray-900">
                      Permission 3
                    </label>
                    <p className="text-gray-500">Option 3</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
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
  );
}

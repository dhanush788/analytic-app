import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";



const Signuser = () => {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const navigate = useNavigate(); 


    const { id } = useParams()
    React.useEffect(() => {
        try {
            const encodedFormData = window.atob(id)
            const username = encodedFormData.split('&')[0].split('=')[1]
            const gmail = decodeURIComponent(encodedFormData.split('&')[1].split('=')[1].replace('%40', '@'));
            setUsername(username)
            setGmail(gmail)
        }
        catch (err) {
            setError(true)
        }
    }, [])
    

    const handleSignUp = (event) => {
      event.preventDefault();
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, gmail , password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Update the display name
          updateProfile(auth.currentUser, {
            displayName: username,
          })
          .then(() => {
            // Store additional user information (e.g., phone number) in a database
            const userId = user.uid;
            const userData = {
              displayName: username,
              user : 'user',
              metadata : user.metadata,
            };
            // Store the additional information in your database
            const db = getDatabase(app); 
            set(ref(db, 'users/' + userId), userData)
              .then(() => {
                navigate('/');
              })
              .catch((error) => {
                console.error('Error storing user data:', error);
              });
          })
          .catch((error) => {
            console.error('Error updating display name:', error);
          });
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error Code:', errorCode);
          console.log('Error Message:', errorMessage);
        });
    }



    return (
        <>
        {error ? <h1>Invalid URL</h1> : 
              <div className="flex min-h-full flex-1">
              <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div>
                    <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Sign up required
                    </h2>
                  </div>
      
                  <div className="mt-10">
                    <div>
                      <form className="space-y-6">
                        <div>
                          <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                          </label>
                          <div className="mt-2">
                            <input
                              id="displayName"
                              name="displayName"
                              type="text"
                              autoComplete="displayName"
                              required
                              value={username}
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
      
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={gmail}
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
      
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
      
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                              Remember me
                            </label>
                          </div>
                        </div>
      
                        <div>
                          <button
                            onClick={(event) => handleSignUp(event)}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign up
                          </button>
                          {message && <div className="text-red-500">{message}</div>} {/* Display error message if exists */}

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        </>
    )
}

export default Signuser
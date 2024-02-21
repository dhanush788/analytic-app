import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  FolderIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {auth} from '../firebase/config'

// Define color palette
const colors = {
  textColor: 'text-white',
  textColorInactive: 'text-gray-400',
  textColorHover: 'hover:text-white',
  textColorActive: 'text-indigo-400',
  bgSidebar: 'bg-gray-900',
  bgSidebarHover: 'hover:bg-gray-800',
  bgSidebarActive: 'bg-gray-800',
  bgProfile: 'bg-gray-800',
  borderSidebar: 'border-gray-700',
  borderProfile: 'border-gray-700',
  bgSearch: 'bg-transparent',
  borderSearch: 'border-gray-700',
  bgHeader: 'bg-gray-900',
  borderHeader: 'border-white/5',
  bgActivityHeader: 'bg-gray-700',
  borderActivityHeader: 'border-white/10',
  bgActivityItem: 'bg-gray-700',
  borderActivityItem: 'border-white/5',
}

const navigation = [
  { name: 'Blah1', href: '#', icon: FolderIcon, current: false },
  { name: 'Add an user', href: '#', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
]

const teams = [
  { id: 1, name: 'Uber', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Ola', href: '#', initial: 'P', current: false },
]

const secondaryNavigation = [
  { name: 'Add a user', href: '#', current: true },
  { name: 'Users List', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log(auth.currentUser)
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className={`relative z-50 xl:hidden ${colors.bgSidebar}`} onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className={`flex grow flex-col gap-y-5 overflow-y-auto ${colors.bgSidebar} px-6 ${colors.borderSidebar}`}>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? colors.bgSidebarActive + ' ' + colors.textColor
                                      : colors.textColorInactive + ' ' + colors.textColorHover + ' ' + colors.bgSidebarHover,
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? colors.bgSidebarActive + ' ' + colors.textColor
                                      : colors.textColorInactive + ' ' + colors.textColorHover + ' ' + colors.bgSidebarHover,
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src={auth?.currentUser?.photoURL}
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">{auth?.currentUser?.displayName}</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className={`flex grow flex-col gap-y-5 overflow-y-auto ${colors.bgSidebar} px-6 ${colors.borderSidebar}`}>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? colors.bgSidebarActive + ' ' + colors.textColor
                              : colors.textColorInactive + ' ' + colors.textColorHover + ' ' + colors.bgSidebarHover,
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? colors.bgSidebarActive + ' ' + colors.textColor
                              : colors.textColorInactive + ' ' + colors.textColorHover + ' ' + colors.bgSidebarHover,
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src={auth?.currentUser?.photoURL}
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{auth?.currentUser?.displayName}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main>
            <header>
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
          </main>
        </div>
      </div>
    </>
  )
}
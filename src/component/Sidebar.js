import {  Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  FolderIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { auth } from '../firebase/config'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Sidebar({ sidebarOpen, setSidebarOpen, colors, navigation, teams = [] }) {

  console.log(teams.length !== 0)


  return (
    <>

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
                        {
                          teams.length !== 0 && (
                            <>
                              <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                              <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {teams?.map((team) => (
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
                            </>
                          )
                        }
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
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col lg:mt-16">
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
                {
                  teams.length !== 0 && (
                    <>
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
                    </>
                  )
                }
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
    </>
  )
}
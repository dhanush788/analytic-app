import React, { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


const Searchbar = ({ sidebarOpen, setSidebarOpen }) => {

    return (
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
                <span class="sr-only">Open sidebar</span>
                <Bars3Icon class="h-5 w-5" aria-hidden="true" />
            </button>

            <h1 class="text-white font-semibold text-xl cursor-pointer">Auto <span class="text-blue-500">Analytica</span></h1>
        </div>

    )
}

export default Searchbar
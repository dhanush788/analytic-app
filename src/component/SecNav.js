import React, { useState } from 'react'

const SecNav = ({secondaryNavigation ,setCurrent , current}) => {
    return (
        <nav className="flex overflow-x-auto border-b border-white/10 py-4">
            <ul
                role="list"
                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
                {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className={(item.name === current) ? 'text-indigo-400' : ''} onClick={() => setCurrent(item.name)}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default SecNav
import React, { createContext, useEffect, useState } from 'react';
import { MapPinIcon, ChartBarIcon, ChartPieIcon, Cog8ToothIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { ArrowTrendingUpIcon } from '@heroicons/react/20/solid'
import { getDatabase, onValue, ref } from 'firebase/database';
import { auth } from '../firebase/config';
import {
    FolderIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(null);
    const [navigation, setNavigation] = useState([]);
    const [teams, setTeams] = useState([])


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/' + auth?.currentUser?.uid + '/user');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setUserType(data);
        });
    }, [auth, user]);

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val(); 
            const filteredData = Object.values(data).filter(obj => obj.user === 'user');
            setTeams(filteredData)
        });
    }, [auth, user]);

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


    useEffect(() => {
        if (userType) {
            const navigationData =
                userType.trim() === 'admin' ?
                    [{
                        name: 'Add User',
                        href: '#',
                        icon: UserPlusIcon,
                        current: true
                    },
                    {
                        name: 'Settings',
                        href: '#',
                        icon: Cog8ToothIcon,
                        current: false
                    }
                    ] :
                    [{
                        name: 'Route Analysis',
                        href: '#',
                        icon: MapPinIcon,
                        current: true
                    },
                    {
                        name: 'Trip Analysis',
                        href: '#',
                        icon: ChartBarIcon,
                        current: false
                    },
                    {
                        name: 'User Behaviour',
                        href: '#',
                        icon: ChartPieIcon,
                        current: false
                    },
                    {
                        name: 'Forecasting',
                        href: '#',
                        icon: ArrowTrendingUpIcon,
                        current: false
                    },
                    {
                        name: 'Additional features',
                        href: '#',
                        icon: UserPlusIcon,
                        current: false
                    },
                    {
                        name: 'Settings',
                        href: '#',
                        icon: Cog8ToothIcon,
                        current: false
                    }
                    ];

            setNavigation(navigationData);
        }
    }, [userType]);





    const setCurrent = (name) => {
        setNavigation((prev) =>
            prev.map((item) => {
                if (item.name === name) {
                    item.current = true;
                } else {
                    item.current = false;
                }
                return item;
            })


        );
    }

    return (
        <OptionsContext.Provider
            value={{
                navigation,
                colors,
                setCurrent,
                teams

            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};
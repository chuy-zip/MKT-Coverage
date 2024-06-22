"use client";
import Styles from './Items.module.css';
import Item from "@components/Item";
import useDrivers from '@/hooks/useDrivers';
import useGliders from '@/hooks/useGliders';
import useKarts from '@/hooks/useKarts';
import { useEffect, useState, useMemo } from 'react';

export default function Items({ type }) {
    const { userDrivers, setUserDrivers } = useDrivers();
    const { userKarts, setUserkarts } = useKarts();
    const { userGliders, setUserGliders } = useGliders();

    const userItemsMap = useMemo(() => ({
        Drivers: { items: userDrivers, setItems: setUserDrivers },
        Karts: { items: userKarts, setItems: setUserkarts },
        Gliders: { items: userGliders, setItems: setUserGliders },
    }), [userDrivers, userKarts, userGliders, setUserDrivers, setUserkarts, setUserGliders]);

    const currentUserItems = userItemsMap[type]?.items;
    const setCurrentUserItems = userItemsMap[type]?.setItems;

    return (
        <>
            {currentUserItems && <div className={Styles.gridItemContainer}>
                {currentUserItems.map((item, index) => (
                    <Item
                        key={index}
                        index={index}
                        item={item}
                        setItems={setCurrentUserItems} />
                ))}
            </div>}
        </>
    );
}

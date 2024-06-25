"use client"

import '../app/globals.css'
import styles from './Coverage.module.css'
import { Providers } from "../app/providers";

import CoursesCoverageData from '@/components/CoursesCoverageData';
import SearchedItemCoverage from '@/components/SearchedItemCoverage';
import RecommendedItemsTable from '@/components/RecommendedItemsTable';
import Items from '@/components/Items';
import ItemTypeBar from '@/components/ItemTypeBar';
import ModifyDataButton from '@/components/ModifyDataButton';

import { useState } from "react";

import ItemCoverageForm from "@components/ItemCoverageForm";

export default function Coverage() {
    const [searchedItem, setSearchedItem] = useState()
    const [selectedItemType, setSelectedItemType] = useState("Drivers")

    return (
        <Providers>

            <div className={styles.pageContainer}>

                <h1>
                    This is the page for {selectedItemType} coverage
                </h1>

                <ItemTypeBar selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />

                <h2>
                    Select the {selectedItemType} you own and then press the button to get the recommended items
                </h2>

                <div className={styles.buttonContainer}>
                    <ModifyDataButton type={selectedItemType} ItemsOwnership={true} />
                    <ModifyDataButton type={selectedItemType} ItemsOwnership={false} />
                </div>

                <Items type={selectedItemType} />

                <CoursesCoverageData type={selectedItemType} />

                <ItemCoverageForm type={selectedItemType} setSearchedItem={setSearchedItem} />

                {searchedItem && <SearchedItemCoverage searchedItem={searchedItem} />}

               <RecommendedItemsTable type={selectedItemType} />

            </div>
        </Providers>
    )
}
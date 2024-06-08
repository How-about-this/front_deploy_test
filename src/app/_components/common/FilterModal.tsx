'use client'

import React, { startTransition, useState } from "react";
import ReactSlider from "react-slider"
import { setFlagsFromString } from "v8";

interface Props {
    setFilterOpen: () => void;
}

const Regions = ["서울", "경기", "강원", "충청", "전라", "경상", "제주"]

export const RegionSelector = ({ open, setOpen }: { open: boolean; setOpen: () => void; }) => {
    const [selectedRegion, setSelectedRegion] = useState<string>("서울")
    return (
        <div className="w-4/5 h-1/10 z-30">
            <button
                className=" text-base w-full h-full bg-main-color"
                onClick={() => {
                    setOpen()
                }
                }>
                {selectedRegion}
            </button>
            {open && (
                <ul className="z-40 w-full h-28 overflow-y-scroll bg-white animate-fade-in-down">
                    {Regions.map((region, index) => (
                        <li
                            className={`text-base w-full h-10 flex justify-center items-center ${region === selectedRegion ? "bg-main-color" : "bg-white"}`}
                            key={index}
                            onClick={() => {
                                setSelectedRegion(region);
                                setOpen();
                            }}
                        >
                            {region}
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    )
}

const FilterModal = ({ setFilterOpen }: Props) => {
    const [age, setAge] = useState<[number, number]>([20, 80]);
    const [distance, setDistance] = useState<[number, number]>([20, 80]);
    const [open, setOpen] = useState<boolean>(false);

    const setRegionSeletorOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <div className=" animate-fade-in-down-left z-20 bg-white w-full h-64 flex flex-col items-center justify-center border-main-color border-4 rounded-lg">
            <div className="text-lg">나이</div>
            <div className="text-sm">{age[0]}세 ~ {age[1]}세</div>
            <div className="w-4/5 h-1/10 box-border ">
                <ReactSlider
                    className="bg-white"
                    thumbClassName="h-6 w-6 bg-main-color rounded-full cursor-pointer outline-none border-red-500 border-2"
                    renderTrack={(props, state) => {
                        const trackColors = ['bg-white', 'bg-main-color bg-opacity-80', 'bg-white'];
                        return (
                            <div
                                {...props}
                                className={`h-4 my-1 rounded-full ${trackColors[state.index]} border-2 border-main-color`}
                            />
                        );
                    }}
                    value={age}
                    onChange={(val) => setAge(val as [number, number])}

                    min={0}
                    max={100}
                    pearling
                    minDistance={5}
                />
            </div>
            <div className=" text-lg">거리</div>
            <div className="text-sm">{distance[0]}KM ~ {distance[1]}KM</div>

            <div className="w-4/5 h-1/10">
                <ReactSlider
                    className="bg-white flex "
                    thumbClassName="h-6 w-6 bg-main-color rounded-full cursor-pointer outline-none border-red-500 border-2"
                    renderTrack={(props, state) => {
                        const trackColors = ['bg-white', 'bg-main-color bg-opacity-80', 'bg-white'];
                        return (
                            <div
                                {...props}
                                className={`h-4 my-1 rounded-full ${trackColors[state.index]} border-2 border-main-color`}
                            />
                        );
                    }}
                    value={distance}
                    onChange={(val) => setDistance(val as [number, number])}
                    min={0}
                    max={100}
                    pearling
                    minDistance={5}
                />
            </div>
            <RegionSelector
                open={open}
                setOpen={setRegionSeletorOpen}
            />
            <div className="flex justify-around w-4/5 h-1/10 mt-5">
                <button className="w-3/10 text-sm font-bold border-red-300 rounded-md shadow-sm bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">적용</button>
                <button onClick={setFilterOpen} className="w-3/10 text-sm border-gray-600 rounded-md shadow-sm bg-gradient-to-br from-gray-500 via-gray-300 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200">취소</button>
            </div>
        </div>
    )
}

export default FilterModal;
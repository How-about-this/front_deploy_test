'use client'

import { useState } from "react";
import Team from "./Team";
import Partner from "./Partner";

//타입들 따로 constants나 types 폴더 만들어서 가져와 쓰는 걸로 바꾸자
type personalInfo = {
    username: string;
    profileImage: string;
}

export type partnerInfo = {
    personalInfo: personalInfo;
    remainTime: number;
    roomNum: number;
}

export type teamInfo = {
    members: personalInfo[];
    title: string;
    description: string;   
}

//Props 타입 객체
interface Props {
    withTeam: boolean;
    objects: partnerInfo[] | teamInfo[];
    prevSlide: () => void;
    nextSlide: () => void;
    currentPage: number;
    objectsPerPage: number;
}

const Containers = ({withTeam, objects, prevSlide, nextSlide, currentPage, objectsPerPage}: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    //페이지 = 이미지 페이지를 의미
    //각 페이지 첫 번째로 가져올 이미지의 인덱스(화살표 클릭 시 변경됨)
    const startIndex = currentPage * objectsPerPage;

    //지금 페이지에서 렌더링할 이미지들 배열
    const currentObjects = objects.slice(startIndex, startIndex + objectsPerPage);

    //페이지의 이미지 슬롯 중 비어있는 값(마지막 페이지는 빈 값 존재 가능)크기의 "" 배열 생성 
    //=> 비어있는 슬롯은 이미지 크기의 빈 슬롯으로 렌더링 
    const emptySlots = objectsPerPage - currentObjects.length;
    const placeholders = Array(emptySlots).fill("");

    return (
        <div
            className="z-10 w-full h-7/10 flex content-around items-center justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 커서가 이미지 콘테이너 위에 호버링 되어있을 때만 페이지 이동 버튼 보여줌 */}
            {isHovered &&
                <button onClick={prevSlide} disabled={currentPage === 0} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-left-arrow bg-center bg-cover">
                </button>
            }
            <div className="w-9/10 h-full flex flex-wrap items-center justify-center">
                {currentObjects.map((object, index) => (
                    withTeam? <Team object={object as teamInfo} key={index}/> : <Partner object={object as partnerInfo} key={index}/>
                ))}
                {placeholders.map((_, index) => (
                    <div key={`placeholder-${index}`} className="w-1/5 h-2/5 mx-5 py-1 bg-gray-200 box-border shadow-lg rounded-md"></div>
                ))}
            </div>
            {isHovered &&
                <button onClick={nextSlide} disabled={(currentPage + 1) * objectsPerPage >= objects.length} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-right-arrow bg-center bg-cover">
                </button>
            }

        </div>)
}

export default Containers;
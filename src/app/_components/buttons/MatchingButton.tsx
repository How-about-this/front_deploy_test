'use client'

const MatchingButton = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <button
                className=" w-2/10 h-1/2 font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
            >
            매칭 시작               
            </button>
        </div>
    )
}

export default MatchingButton;
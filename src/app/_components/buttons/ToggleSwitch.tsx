'use client'

interface Props {
    withTeam: boolean;
    setWithTeam: () => void;
}

const ToggleSwitch = ({withTeam, setWithTeam}: Props) => {

    return (
        <div
            className={`mx-2 relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out cursor-pointer ${withTeam ? 'bg-main-color' : 'bg-main-color'}`}
            onClick={setWithTeam}
        >
            <span className={`transform transition-transform duration-200 ease-in-out inline-block w-4 h-4 bg-white rounded-full ${withTeam ? 'translate-x-6' : 'translate-x-1'}`} />
        </div>
    );
};

    export default ToggleSwitch;

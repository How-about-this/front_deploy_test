
'use client'

import { useSelector } from "react-redux"
import MatchingModal from "./_components/MatchingModal"
import { RootState } from "@/state/reducers/rootReducer"


type Props = {}

const ClientSideLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const isOpened = useSelector((state: RootState) => state.matchingStatusModal.isOpened)

    return (
        <div>
            {children}
            {isOpened && <MatchingModal />}
        </div>
    )
}

export default ClientSideLayout
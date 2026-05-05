import { useState } from "react";

const useConfirm = () => {

    const [pendingId, setPendingId] = useState(null)

    const requestConfirm = (id) => setPendingId(id)
    const cancelConfirm = () => setPendingId(null)

    return {
        pendingId,
        isOpen: pendingId !== null,
        requestConfirm,
        cancelConfirm
    }
}

export default useConfirm
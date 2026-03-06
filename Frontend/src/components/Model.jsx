

export default function ({ children ,onClose}) {
    return (
        <>

        <div className="backdrop" onClick={onClose}>  </div>
            <dialog className="modal" open>
                {children}
            </dialog>
       
        </>
    )
}
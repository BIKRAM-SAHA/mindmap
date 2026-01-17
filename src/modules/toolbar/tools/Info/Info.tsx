import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import InfoModal from './components/Modal/InfoModal'
import styles from './Info.module.css'

function Info() {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (showModal && e.key === 'Escape') {
                e.preventDefault()
                setShowModal(false)
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [showModal])

    return (
        <>
            <div
                className={styles.infoContainer}
                onClick={() => setShowModal(true)}
            >
                ⌨️
            </div>
            {showModal &&
                createPortal(
                    <InfoModal
                        onClose={() => {
                            setShowModal(false)
                        }}
                    />,
                    document.body
                )}
        </>
    )
}

export default Info

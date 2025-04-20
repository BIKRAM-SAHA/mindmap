import { useState } from "react";
import { createPortal } from "react-dom";
import InfoModal from "./components/Modal/InfoModal";
import styles from "./Info.module.css";

type Props = {};

function Info({}: Props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                className={styles.infoContainer}
                onClick={() => setShowModal(true)}
            >
                ?
            </div>
            {showModal &&
                createPortal(
                    <InfoModal
                        onClose={() => {
                            setShowModal(false);
                        }}
                    />,
                    document.body
                )}
        </>
    );
}

export default Info;

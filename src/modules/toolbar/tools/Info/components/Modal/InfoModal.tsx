import CommandBtn from "../CommandBtn/CommandBtn";
import { commands } from "./InfoModal.constants";
import style from "./InfoModal.module.css";
import { InfoModalProps as Props } from "./InfoModal.types";

function InfoModal({ onClose }: Props) {
    return (
        <div className={style.modalWrapper}>
            <div className={style.modalContainer}>
                <div className={style.commands}>
                    {commands.map((command) => (
                        <span
                            className={[
                                style.tooltip,
                                style.commandContainer,
                            ].join(" ")}
                            data-tooltip={command.subTitle}
                        >
                            <div className={style.commandKeys}>
                                {command.keys.map((key, index) => (
                                    <>
                                        <CommandBtn text={key} />
                                        {index !== command.keys.length - 1 &&
                                            "+"}
                                    </>
                                ))}
                                :
                            </div>
                            <div>{command.title}</div>
                        </span>
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default InfoModal;

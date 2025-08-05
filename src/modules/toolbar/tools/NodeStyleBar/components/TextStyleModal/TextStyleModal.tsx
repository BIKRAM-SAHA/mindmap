import MindMapContext from "@contexts/MindMapContext";
import NodeStyleBarContext from "@contexts/NodeStyleBarContext";
import { useContext, useState } from "react";
import nodeStyleBarCommonStyles from "../common/style.module.css";
import { DEFAULT_TEXT_COLOR } from "../common/constants";

type Props = {};

function TextStyleModal({}: Props) {
    const { activeNodeId, nodes, onTextColorChange } =
        useContext(MindMapContext) ?? {};
    if (!activeNodeId || !nodes || !onTextColorChange)
        throw new Error("MindMapContext not initiated properly");

    const { buttonSelected, setButtonSelected } =
        useContext(NodeStyleBarContext);
    if (!buttonSelected)
        throw new Error("unexpected null value for button selected");

    const [color, setColor] = useState<string>(
        nodes.find((item) => item.id === activeNodeId)?.meta.textColor ||
            DEFAULT_TEXT_COLOR
    );

    const handleSave = () => {
        onTextColorChange(color);

        setButtonSelected(null);
    };
    const handleCancel = () => {
        setButtonSelected(null);
    };

    return (
        <div className={nodeStyleBarCommonStyles.container}>
            <h1>Text Styles</h1>
            <div>
                <label>Color</label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                        setColor(e.target.value);
                    }}
                />
            </div>
            <div className={nodeStyleBarCommonStyles.btnsContianer}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default TextStyleModal;

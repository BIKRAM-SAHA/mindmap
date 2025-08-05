import { useContext, useState } from "react";
import MindMapContext from "@contexts/MindMapContext";
import NodeStyleBarContext from "@contexts/NodeStyleBarContext";
import nodeStyleBarCommonStyles from "../common/style.module.css";
import { DEFAULT_FILL_COLOR } from "../common/constants";

type Props = {};

function FillStyleModal({}: Props) {
    const { activeNodeId, nodes, onFillColorChange } =
        useContext(MindMapContext) ?? {};
    if (!activeNodeId || !nodes || !onFillColorChange)
        throw new Error("MindMapContext not initiated properly");

    const { buttonSelected, setButtonSelected } =
        useContext(NodeStyleBarContext);
    if (!buttonSelected)
        throw new Error("unexpected null value for button selected");

    const [color, setColor] = useState<string>(
        nodes.find((item) => item.id === activeNodeId)?.meta.fillColor ||
            DEFAULT_FILL_COLOR
    );

    const handleSave = () => {
        onFillColorChange(color);

        setButtonSelected(null);
    };
    const handleCancel = () => {
        setButtonSelected(null);
    };

    return (
        <div className={nodeStyleBarCommonStyles.container}>
            <h1>Fill Styles</h1>
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

export default FillStyleModal;

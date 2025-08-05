import MindMapContext from "@contexts/MindMapContext";
import NodeStyleBarContext from "@contexts/NodeStyleBarContext";
import { useContext, useState } from "react";
import nodeStyleBarCommonStyles from "../common/style.module.css";
import {
    DEFAULT_BORDER_COLOR,
    DEFAULT_BORDER_WIDTH,
} from "../common/constants";

type Props = {};

function BorderStyleModal({}: Props) {
    const { activeNodeId, nodes, onLineColorChange, onLineWidthChange } =
        useContext(MindMapContext) ?? {};
    if (!activeNodeId || !nodes || !onLineColorChange || !onLineWidthChange)
        throw new Error("MindMapContext not initiated properly");

    const { buttonSelected, setButtonSelected } =
        useContext(NodeStyleBarContext);
    if (!buttonSelected)
        throw new Error("unexpected null value for button selected");

    const [color, setColor] = useState<string>(
        nodes.find((item) => item.id === activeNodeId)?.meta.lineColor ||
            DEFAULT_BORDER_COLOR
    );
    const [width, setWidth] = useState<string>(
        `${nodes.find((item) => item.id === activeNodeId)?.meta.lineWidth}` ||
            DEFAULT_BORDER_WIDTH
    );

    const handleSave = () => {
        onLineColorChange(color);
        onLineWidthChange(
            parseInt(width.length ? width : DEFAULT_BORDER_WIDTH)
        );

        setButtonSelected(null);
    };
    const handleCancel = () => {
        setButtonSelected(null);
    };

    return (
        <div className={nodeStyleBarCommonStyles.container}>
            <h1>Border Styles</h1>
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
            <div>
                <label>Width</label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => {
                        setWidth(e.target.value);
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

export default BorderStyleModal;

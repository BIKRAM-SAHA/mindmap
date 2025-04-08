import { AbsolutePoint } from "@modules/graphics/common/index.types";

export type BaseNodeElemProps = {
    type: "root" | "node";
    NodeData: {
        id: string,
        text: string;
        position: AbsolutePoint;
    };
};

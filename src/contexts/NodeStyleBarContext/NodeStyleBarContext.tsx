import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"
import { BUTTON_TYPE } from "@appTypes/NodeStyle.types";

const defaultValue: { buttonSelected: BUTTON_TYPE | null, setButtonSelected: Dispatch<SetStateAction<BUTTON_TYPE | null>> } = {
    buttonSelected: null,
    setButtonSelected: () => { },
}

const NodeStyleBarContext = createContext(defaultValue);

export function NodeStyleBarContextProvider({ children }: PropsWithChildren) {
    const [buttonSelected, setButtonSelected] = useState<BUTTON_TYPE | null>(defaultValue.buttonSelected);

    return (
        <NodeStyleBarContext.Provider value={{ buttonSelected, setButtonSelected }}>{children}</NodeStyleBarContext.Provider>
    )
}

export default NodeStyleBarContext
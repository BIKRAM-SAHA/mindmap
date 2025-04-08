import { PathProps as Props } from "./Path.types";

function Path({ from, to }: Props) {
    const fromx = from.x;
    const fromy = from.y;
    const tox = to.x;
    const toy = to.y;

    const controlx = fromx;
    const controly = toy;

    return (
        <path
            d={`M ${fromx} ${fromy} Q ${controlx} ${controly}, ${tox} ${toy}`}
            stroke="black"
            fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    );
}

export default Path;

import React, { useEffect, useState } from 'react';

function NodeArrowHead({pointPos}) {
    return (
        <polygon className="NodeArrowHead"
                    points={`${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y - 10} ${pointPos.x - 10},${pointPos.y - 10}`}
                    style={{fill: "black"}}/>
    );
}


export default function NodeArrow({ startId, endId }) {
    const [start, setStart] = useState({x: 0, y: 0});
    const [end, setEnd] = useState({x: 0, y: 0});

    const [nodeState, setNodeState] = useState(true); //TODO: Это бы исправить чтобы не каждую секунду обновляло

    useEffect(() => {
        const startElement = document.getElementById(startId);
        const endElement = document.getElementById(endId);
        // setNodeState(!nodeState)
        if (startElement && endElement) {
            setStart({
                x: startElement.getBoundingClientRect().left + startElement.getBoundingClientRect().width/2,
                y: startElement.getBoundingClientRect().bottom,
            });
            setEnd({
                x: endElement.getBoundingClientRect().left + startElement.getBoundingClientRect().width/2,
                y: endElement.getBoundingClientRect().top,
            });
        }
    },[start, end, nodeState, startId, endId]);

    return (
        <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y-10} style={{stroke: "black", strokeWidth: 2}}/>
            <NodeArrowHead pointPos={end}/>
        </svg>

    );
};

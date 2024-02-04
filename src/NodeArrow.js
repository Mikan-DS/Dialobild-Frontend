import React, { useEffect, useState } from 'react';

function NodeArrowHead({pointPos}) {
    return (
        <polygon className="NodeArrowHead"
                    points={`${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y - 10} ${pointPos.x - 10},${pointPos.y - 10}`}
                    style={{fill: "black"}}/>
    );
}


export default function NodeArrow({ startId, endId, updateArrows }) {
    const [start, setStart] = useState({x: 0, y: 0});
    const [end, setEnd] = useState({x: 0, y: 0});

    const updateArrow = () => {
        const startElement = document.getElementById(startId);
        const endElement = document.getElementById(endId);
        if (startElement && endElement) {
            let newStart = {
                x: startElement.getBoundingClientRect().left + startElement.getBoundingClientRect().width/2,
                y: startElement.getBoundingClientRect().bottom,
            };
            let newEnd = {
                x: endElement.getBoundingClientRect().left + startElement.getBoundingClientRect().width/2,
                y: endElement.getBoundingClientRect().top,
            };

            if (newStart.x !== start.x || newEnd.x !== end.x || newStart.y !== start.y || newEnd.y !== end.y){
                setStart(newStart);
                setEnd(newEnd);
            }
        }
    };

    updateArrows.push(updateArrow); // Обновляет рендер из вне

    useEffect(updateArrow); // Проверяет один раз за рендер

    useEffect(() => {

        window.addEventListener('resize', updateArrow);
        window.addEventListener('scroll', updateArrow);

        const canvas = document.getElementById("DialobildCanvas")
        if (canvas){
            canvas.addEventListener('scroll', updateArrow);
        }

        return () => {
            window.removeEventListener('resize', updateArrow);
            window.removeEventListener('scroll', updateArrow);
            if (canvas){
                canvas.removeEventListener('scroll', updateArrow);
            }
        };
    }, []); // Следит за изменениями после рендера


    return (
        <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex:-1}}>
            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y-10} style={{stroke: "black", strokeWidth: 2}}/>
            <NodeArrowHead pointPos={end}/>
        </svg>
    );
};

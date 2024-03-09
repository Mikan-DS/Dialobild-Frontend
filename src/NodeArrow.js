import React, { useEffect, useState } from 'react';

function NodeArrowHead({pointPos, arrowColor}) {
    return (
        <polygon className="NodeArrowHead"
                    points={`${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y - 10} ${pointPos.x - 10},${pointPos.y - 10}`}
                    style={{fill: arrowColor}}/>
    );
}


export default function NodeArrow({ startId, endId, updateArrows, arrowColor, arrowStyle}) { //TODO Может быть хранить тут сразу все стрелки?

    arrowStyle = arrowStyle? arrowStyle: "solid"

    const [start, setStart] = useState({x: 0, y: 0});
    const [end, setEnd] = useState({x: 0, y: 0});

    arrowColor = arrowColor? arrowColor: "black"

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const updateArrow = (event) => {
        const startElement = document.getElementById(startId);
        const endElement = document.getElementById(endId);
        if (startElement && endElement) {
            let newStart = {
                x: startElement.getBoundingClientRect().left + startElement.getBoundingClientRect().width/2,
                y: startElement.getBoundingClientRect().bottom,
            };
            let newEnd = {
                x: endElement.getBoundingClientRect().left + endElement.getBoundingClientRect().width/2,
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

    return ( // Решить проблему с расширением экрана
        <svg style={{position: 'absolute', top: scrollTop, left: scrollLeft, width: '100%', height: '100%', pointerEvents: 'none', zIndex:-1}}>
            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y-10} style={{stroke: arrowColor, strokeWidth: 2, strokeDasharray: arrowStyle}}/>
            <NodeArrowHead pointPos={end} arrowColor={arrowColor}/>
        </svg>
    );
};

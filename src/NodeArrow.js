import React, { useEffect, useState } from 'react';

function NodeArrowHead({pointPos, arrowColor, headDirection}) {

    let points = "";
    if (headDirection === 1){
        points = `${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y + 10} ${pointPos.x - 10},${pointPos.y + 10}`;
    }
    else if (headDirection === 2){
        points = `${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y - 10} ${pointPos.x + 10},${pointPos.y + 10}`;
    }
    else if (headDirection === 3){
        points = `${pointPos.x},${pointPos.y} ${pointPos.x - 10},${pointPos.y - 10} ${pointPos.x - 10},${pointPos.y + 10}`;
    }
    else {
        points = `${pointPos.x},${pointPos.y} ${pointPos.x + 10},${pointPos.y - 10} ${pointPos.x - 10},${pointPos.y - 10}`;
    }
    return (
        <polygon className="NodeArrowHead"
                    points={points}
                    style={{fill: arrowColor}}/>
    );
}


export default function NodeArrow({ startId, endId, updateArrows, arrowColor, arrowStyle}) {

    arrowStyle = arrowStyle? arrowStyle: "solid"

    const [start, setStart] = useState({x: 0, y: 0});
    const [end, setEnd] = useState({x: 0, y: 0});
    const [headDirection, setHeadDirection] = useState(0);

    arrowColor = arrowColor? arrowColor: "black"

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const updateArrow = (event) => {
        const startElement = document.getElementById(startId);
        const endElement = document.getElementById(endId);
        if (startElement && endElement) {
            const startElementRect = startElement.getBoundingClientRect();
            const endElementRect = endElement.getBoundingClientRect();

            const leaderY = endElementRect.top-startElementRect.top;
            const leaderX = endElementRect.left-startElementRect.left;

            const newHeadDirection = leaderY === 0? (leaderX<0?2:3): leaderY<0?1:0

            let newStart = {
                x: startElementRect.left + startElementRect.width*(leaderY!==0?.5:leaderX<0?0:1),
                y: startElementRect.top + startElementRect.height*(leaderY<0?0:leaderY>0?1:.5),
            };
            let newEnd = {
                x: endElementRect.left + endElementRect.width*(leaderY!==0?.5:leaderX<0?1:0),
                y: endElementRect.top + endElementRect.height*(leaderY<0?1:leaderY>0?0:.5),
            };
            if (newStart.x !== start.x || newEnd.x !== end.x || newStart.y !== start.y || newEnd.y !== end.y){
                setStart(newStart);
                setEnd(newEnd);
                setHeadDirection(newHeadDirection)
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
        <svg style={{position: 'absolute', top: scrollTop, left: scrollLeft, width: '100%', height: '100%', pointerEvents: 'none', zIndex:-1}}>
            <line
                x1={start.x} y1={start.y}
                x2={headDirection===0 || headDirection===1?end.x:headDirection===2?end.x+10:end.x-10}
                y2={headDirection===2 || headDirection===3?end.y:headDirection===0?end.y-10:end.y+10}
                style={{stroke: arrowColor, strokeWidth: 2, strokeDasharray: arrowStyle}}/>
            <NodeArrowHead pointPos={end} arrowColor={arrowColor} headDirection={headDirection}/>
        </svg>
    );
};

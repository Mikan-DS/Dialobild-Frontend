import React, {useEffect, useState} from 'react';
import Layer from './Layer';
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows";
import NodeArrow from "./NodeArrow";
import {DndContext} from "@dnd-kit/core";

export default function DialobildCanvas(props) {
    const style = {
        overflowX: 'auto',
        width: 'auto',
        display: 'flex',
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
    };


    const styleContainer = {
        flexWrap: 'wrap',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
    };

    const arrowUpdates = []

    function updateArrows() {
        for (let i = 0; i<arrowUpdates.length; i++){
            arrowUpdates[i]();
        }
    }

    return (
        <div style={style} className="DialobildCanvas" id="DialobildCanvas">
            <DndContext onDragMove={updateArrows} onDragEnd={updateArrows} onDragStart={updateArrows}>
                <div style={styleContainer} id="DialobildCanvasContainer">
                    <button id="createClearNode" onClick={props.dialobild.createClearNode}>
                        Создать
                    </button>
                    {props.dialobild.getLayers().map((layer, index) => (
                        <Layer key={"layer_" + layer.y} layer={layer} dialobild={props.dialobild}/>
                    ))}
                </div>
                <NodeArrow startId="createClearNode" endId="node_1" updateArrows={arrowUpdates}></NodeArrow>
            </DndContext>
        </div>
    );
}

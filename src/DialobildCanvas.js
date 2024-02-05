import React, {useEffect, useState} from 'react';
import Layer from './Layer';
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows";
import NodeArrow from "./NodeArrow";
import {DndContext} from "@dnd-kit/core";

export default function DialobildCanvas({dialobild}) {
    const style = {
        overflowX: 'auto',
        width: '100%',
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

        gap: 70,
    };

    const links = dialobild.getLinks()

    const arrowUpdates = []

    function updateArrows() {
        for (let i = 0; i<arrowUpdates.length; i++){
            arrowUpdates[i]();
        }
    }

    return (
        <div style={style} className="DialobildCanvas" id="DialobildCanvas">
            <DndContext onDragMove={updateArrows} onDragEnd={(event) => {updateArrows(); dialobild.moveNodeToCell(event)}} onDragStart={updateArrows}>
                <div style={styleContainer} id="DialobildCanvasContainer">
                    <button id="createClearNode" onClick={dialobild.createClearNode}>
                        Создать
                    </button>
                    {dialobild.getLayers().map((layer, index) => (
                        <Layer key={"layer_" + layer.y} layer={layer} dialobild={dialobild}/>
                    ))}
                </div>
                {links.mustHave.map((rule, index) => (
                    <NodeArrow key={index} startId={rule.startId} endId={rule.endId} updateArrows={arrowUpdates} arrowColor="green"/>
                ))}
            </DndContext>
        </div>
    );
}

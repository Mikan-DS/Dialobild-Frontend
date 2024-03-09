import React, {useEffect} from 'react';
import Layer from './Layer';
import NodeArrow from "./NodeArrow";
import {DndContext} from "@dnd-kit/core";

export default function DialobildCanvas({dialobild}) {
    const style = {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    };
    const styleContainer = {
        flexWrap: 'wrap',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        gap: 70,
    };

    useEffect(() => {
        if (document.getElementById("DialobildCanvas").getBoundingClientRect().width > document.getElementById("DialobildCanvasContainer").getBoundingClientRect().width){
            document.getElementById("DialobildCanvas").style.justifyContent = 'center';
        }
        else {
            document.getElementById("DialobildCanvas").style.justifyContent = "start";
        }
    }, [document.getElementById("DialobildCanvasContainer") && document.getElementById("DialobildCanvasContainer").getBoundingClientRect().width])

    const links = dialobild.getLinks()
    const arrowUpdates = []
    function updateArrows() {
        for (let i = 0; i<arrowUpdates.length; i++){
            arrowUpdates[i]();
        }
    }

    return (
        <div style={style} className="DialobildCanvas" id="DialobildCanvas">
            <DndContext
                onDragMove={updateArrows}
                onDragEnd={(event) => {updateArrows(); dialobild.moveNodeToCell(event)}}
                onDragStart={(event) => {updateArrows(); dialobild.setActiveNode(event.active.data.current.node)}}>
                <div style={styleContainer} id="DialobildCanvasContainer">
                    <button id="createClearNode" onClick={dialobild.createClearNode}>
                        Создать
                    </button>
                    {dialobild.getLayers().map((layer, index) => (
                        <Layer key={"layer_" + layer.y} layer={layer} dialobild={dialobild}/>
                    ))}
                </div>
                {Object.keys(links).map((key) => (
                    links[key].map((rule, index) => (
                        <NodeArrow key={index} startId={rule.startId} endId={rule.endId} updateArrows={arrowUpdates} arrowColor={dialobild.ruleTypes[key].color}  arrowStyle={dialobild.ruleTypes[key].arrowStyle}/>
                    ))
                ))}
            </DndContext>
        </div>
    );
}

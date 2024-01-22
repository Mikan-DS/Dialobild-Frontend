import {DndContext} from "@dnd-kit/core";
import React, {useState} from "react";
import NodeLayer from "./NodeLayer";
import Node from "./Node";
import RemoveFromList from "./utils";

export default function DialobildCanvas(){

    const initialLayers = [["layer_1", ["node_1", "node_2", "node_3", "node_4"]], ["layer_2", []]]

    const [layers, setLayers] = useState(initialLayers)
    const [lastLayer, setLastLayer] = useState(3)

    return (
        <DndContext onDragEnd={moveNode}>
            {layers.map(([layer, nodes]) =>
                <NodeLayer key={layer} id={layer}>
                    {nodes.map(node => <Node key={node} id={node} typeColor="#DAA7"/>)}
                </NodeLayer>
            )}
        </DndContext>
    );


    function moveNode(event){
        const { active, over } = event;

        if (over){
            setLayers(layers => {
                const newLayers = [...layers];

                for (const layer of newLayers) {
                    if (layer[0] === over.id && layer[1].indexOf(active.id) !== -1){
                        console.log("CURRENT "+layer[0])
                        return newLayers;
                    }
                    if (RemoveFromList(layer[1], active.id)) {
                        if (layer[1].length === 0){
                            RemoveFromList(newLayers, layer)
                        }
                        break;
                    }

                }

                for (const layer of newLayers) {
                    if (layer[0] === over.id) {
                        layer[1].push(active.id);
                        break;
                    }
                }


                if (newLayers[newLayers.length-1][1].length !== 0){
                    newLayers.push(["layer_"+lastLayer, []]);
                    setLastLayer(lastLayer+1)
                }

                return newLayers;
            });
        }


    }


}

import {DndContext} from "@dnd-kit/core";
import NodeLayer from "./NodeLayer";
import Node from "./Node";
import RemoveFromList from "./utils";

export default function DialobildCanvas(props){


    const [layers, setLayers] = props.layersControl

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

                    let layer_id = "layer_"+(1+Number(newLayers[newLayers.length-1][0].slice(6)));


                    newLayers.push([layer_id, []]);
                }

                return newLayers;
            });
        }


    }


}

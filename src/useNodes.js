import {useState} from "react";
import src_example from "./src_example.json"

export default function useNodes(){

    const [nodeLayers, setNodeLayers] = useState(src_example.nodes)
    const [activeNode, setActiveNode] = useState(null)

    let nodes = {}

    for (let layerIndex = 0; layerIndex<nodeLayers.length; layerIndex++){
        let layer = nodeLayers[layerIndex];

        for (let nodeIndex = 0; nodeIndex<layer.length; nodeIndex++){
            let node = layer[nodeIndex];
            nodes[node.id] = node;
        }
    }

    function addNode(){
        const new_nodes = [...nodeLayers]
        new_nodes[0].push(      {
            "id": 2,
            "content": "Пример ноды номер 2",
            "node_type": "question",
            "links": {
                "must_have": [],
                "disallow": []
            }
        })
        setNodeLayers(new_nodes)
    }

    function layeredNodes() {

        const layers = [];

        for (let layerIndex = 0; layerIndex<nodeLayers.length; layerIndex++){
            let layer = nodeLayers[layerIndex];
            layers.push([])

            for (let nodeIndex = 0; nodeIndex<layer.length; nodeIndex++){
                let node = layer[nodeIndex];
                layers[layerIndex].push(
                    node.id
                )
            }
        }

        return layers;
    }

    function getNode(id) {
        return nodes[id];

    }

    function getActiveNode() {
        if (activeNode !== null){
            return getNode(activeNode);

        }
        else {
            return null;
        }


    }

    function nodeClickHandler(node) {

        setActiveNode(
            node.active.data.current["node_id"]
        )

    }


    return {
        nodesLayers: nodeLayers,
        addNode: addNode,
        setNodes: setNodeLayers,
        layeredNodes: layeredNodes,
        getNode: getNode,
        activeNode: activeNode,
        setActiveNode: setActiveNode,
        nodeClickHandler: nodeClickHandler,
        nodesList: nodes,
        getActiveNode: getActiveNode}
}
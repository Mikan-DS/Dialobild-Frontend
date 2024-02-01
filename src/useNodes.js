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


    function getLinks(){


        let links = {
            must_have: [],
            disallow: []
        }

        console.log(nodes.length)
        for (let i = 0; i<nodes.length; i++){
            const node = nodes[i];
            const node_id = "node_"+node.id

            for (let j = 0; i<node.links.must_have.length; j++){
                links.must_have.push([node_id, "node_"+node.links.must_have[j]])
            }
            for (let j = 0; i<node.links.disallow.length; j++){
                links.disallow.push([node_id, "node_"+node.links.disallow[j]])
            }

        }

        return links;


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
        nodesList: nodes, // это не лист
        getActiveNode: getActiveNode,
        getLinks: getLinks


    }
}
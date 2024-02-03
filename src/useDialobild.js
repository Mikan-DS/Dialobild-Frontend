import { useState } from 'react';

export default function useDialobild() {
    const [nodes, setNodes] = useState([]);

    function createClearNode() {
        const id = nodes.length === 0 ? 1 : Math.max(...nodes.map(node => node.id)) + 1;
        let x = 1;
        const y = 1;

        while(getNodeAtLocation(x, y)) {
            x++;
        }

        const node_type = 'ask';
        const content = '???';
        const rules = {};
        const statements = [];
        const location = {x, y}

        const newNode = { id, location, node_type, content, rules, statements };

        setNodes([...nodes, newNode]);
    }




    function getNodeAtLocation(x, y) {
        return nodes.find(node => node.location.x === x && node.location.y === y);
    }

    function getLayers () {
        const layers = [];
        let i = 1
        if (nodes.length !== 0){

            const maxY = Math.max(...nodes.map(node => node.location.y));
            for (; i <= maxY; i++){
                const nodesInLayer = nodes.filter(node => node.location.y === i);
                nodesInLayer.sort((a, b) => a.location.x - b.location.x);
                layers.push({y: i, nodes: nodesInLayer});
            }
        }

        layers.push({y: i, nodes: []});

        return layers;
    }

    function getWidth(){
        return Math.max(...nodes.map(node => node.location.x));
    }


    function moveNodeToCell({active, over}){
        // console.log(over);

        const node = active.data.current.node
        const cellLocation = over.data.current.cellLocation
        node.location.y = cellLocation.y;

        // const next = cellLocation%0===0;
        let x = Math.floor(cellLocation.x/2)+1;
        // x = next? x+1:x;
        // node.location.x = x;

        // console.log(x)

        const layerNodes = nodes.filter(lNode => lNode.location.y === node.location.y)
        layerNodes.sort((a, b) => a.location.x - b.location.x);
        // console.log(layerNodes)


        let lastNode = node
        for (let i = x; i <= getWidth(); i++){

            const currentNode = getNodeAtLocation(i, cellLocation.y)



            if (currentNode && currentNode.location.x === lastNode.location.x){
                console.log(currentNode)
                lastNode.location.x = i;
                lastNode = currentNode;
            }
            else {
                lastNode.location.x = i;
                break;
            }
            // if (layerNodes[i].location.x >= x){
            //     layerNodes[i].location.x++;
            // }
        }
        // console.log(layerNodes)

        // node.location.x =


        setNodes([...nodes])


    }


    return {
        nodes,
        setNodes,
        createClearNode,
        getNodeAtLocation,
        getLayers,
        getWidth,
        moveNodeToCell
    }
}

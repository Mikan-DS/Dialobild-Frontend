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



    return {
        nodes,
        setNodes,
        createClearNode,
        getNodeAtLocation,
        getLayers
    }
}

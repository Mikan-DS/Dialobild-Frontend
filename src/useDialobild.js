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
        const rules = {mustHave: [], mustNotHave: [], mustHaveAll: []};
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

    function isAllowedCell({activeNode, cellLocation}){
        const node = getNodeAtLocation((cellLocation.x+1) / 2, cellLocation.y)



        if (activeNode){

            if (node && node.location === activeNode.location){
                return false;
            }

            return !(activeNode.data.current.node.location.y === cellLocation.y && Math.abs((activeNode.data.current.node.location.x * 2 - 1) - cellLocation.x) === 1)
        }

        return false;

    }

    function moveNodeToCell({active, over}){

        const node = active.data.current.node
        const cellLocation = over.data.current.cellLocation

        if (!over || !isAllowedCell({activeNode: active, cellLocation: cellLocation} ) || (over.data.current.node && node.id === over.data.current.node.id)){
            return;
        }

        let targetLocation = {x: Math.floor(cellLocation.x/2)+1, y:cellLocation.y}

        let lastNode = node
        for (let i = targetLocation.x; i <= getWidth()+1; i++){
            const currentNode = getNodeAtLocation(i, cellLocation.y)
            lastNode.location = targetLocation;
            if (!currentNode){
                break;
            }
            else {
                targetLocation = {x: targetLocation.x+1, y: targetLocation.y};
                lastNode = currentNode;
            }
        }

        setNodes([...nodes])
    }


    return {
        nodes,
        setNodes,
        createClearNode,
        getNodeAtLocation,
        getLayers,
        getWidth,
        moveNodeToCell,
        isAllowedCell
    }
}

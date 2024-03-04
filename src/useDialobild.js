import {useEffect, useState} from 'react';
import useOAuth from "./useOAuth";
import variables from "./variables.json"

let fetchState = false;


export default function useDialobild() {

    const [apiError, setApiError] = useState(null);

    const oAuth = useOAuth()

    const [projects, setProjects] = useState({})

    useEffect( () => {

        async function fetchData(){

            if (!fetchState){
                fetchState = true;


                let response = null;

                if (!oAuth.getOAuthState()){
                    response = await oAuth.fetchAPI(`${variables.backend_url}/api/projects/`);

                    if (response === false){
                        console.log("Авторизации нет")
                        oAuth.beginAuth()
                    }
                    else {
                        console.log(response)
                    }
                }
                console.log(oAuth.getOAuthState())

                if (oAuth.getOAuthState()){
                    await oAuth.authorize()
                    if (!oAuth.getOAuthState()){
                        response = await oAuth.fetchAPI(`${variables.backend_url}/api/projects/`);
                        console.log(response)
                    }
                }

                if (response){
                    setProjects(response)

                    setActiveProject({
                        id:6,
                        name:"Test project"
                    })


                    const project = await oAuth.fetchAPI(`${variables.backend_url}/api/project/id/6/`)

                    nodes.length = 0
                    nodes.push(...project.nodes)

                    setNodeTypes(project.nodeTypes.reduce((acc, obj) => { //TODO нужно переделать так, чтобы обозначения можно было читать везде
                        acc[obj.code] = obj.color;
                        return acc;
                    }, {}))



                    updateNodeProperty()
                }


            }

        }
        fetchData();


    }, [])

    const [nodes, setNodes] = useState([]);
    const [activeProject, setActiveProject] = useState(null);

    const [activeNode, setActiveNode] = useState(null)
    const [selectionMode, setSelectionMode] = useState(null)
    const [nodeTypes, setNodeTypes] = useState({
        ask: "#93af93",
        answer: "#7888f3"
    })


    const selectionModes = {
        null: "solid #0000",
        "mustHave": "solid #0F0F",
        "mustHaveAll": "solid #00FF",
        "mustNotHave": "solid #F00F",
        "self": "dash #F0FF",
    }


    function createClearNode({x, y}) {

        const id = nodes.length === 0 ? 1 : Math.max(...nodes.map(node => node.id)) + 1;
        // let x = 1;
        // const y = 1;
        const targetLocation = {x: x?x:1, y: y?y:1}

        while(getNodeAtLocation(targetLocation.x, targetLocation.y)) {
            targetLocation.x++;
        }

        const nodeType = 'ask';
        const content = '???';
        const rules = {mustHave: [], mustNotHave: [], mustHaveAll: []};
        const statements = []; //TODO
        // const location = {x, y}

        const newNode = { id, location:targetLocation, nodeType, content, rules, statements };

        nodes.push(newNode);

        // setNodes([...nodes]);

        updateNodeProperty();

        return newNode;
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

    function moveNodeToLocation({node, targetLocation}){
        let lastNode = node
        for (let i = targetLocation.x; i <= getWidth()+1; i++){
            const currentNode = getNodeAtLocation(i, targetLocation.y)
            lastNode.location = targetLocation;
            if (!currentNode){
                break;
            }
            else {
                targetLocation = {x: targetLocation.x+1, y: targetLocation.y};
                lastNode = currentNode;
            }
        }

        updateNodeProperty();
    }

    function moveNodeToCell({active, over}){

        if (!over){
            return;
        }

        const node = active.data.current.node
        const cellLocation = over.data.current.cellLocation

        if (!isAllowedCell({activeNode: active, cellLocation: cellLocation} ) || (over.data.current.node && node.id === over.data.current.node.id)){
            return;
        }

        let targetLocation = {x: Math.floor(cellLocation.x/2)+1, y:cellLocation.y}

        moveNodeToLocation({node, targetLocation})

    }

    function getLinks() {

        const links = {mustHave: [], mustHaveAll: [], mustNotHave: []}

        for (let i = 0; i<nodes.length; i++){
            let node = nodes[i]


            if (!(node.rules.mustHave.length || node.rules.mustHaveAll.length)){
                links.mustHave.push({
                    startId: "createClearNode",
                    endId: "node_"+node.id
                })
            }
            for (let l = 0; l<node.rules.mustHave.length;l++){

                const rule = node.rules.mustHave[l];
                links.mustHave.push({
                    startId: "node_"+rule,
                    endId: "node_"+node.id
                })
            }
            for (let l = 0; l<node.rules.mustHaveAll.length;l++){

                const rule = node.rules.mustHaveAll[l];
                links.mustHaveAll.push({
                    startId: "node_"+rule,
                    endId: "node_"+node.id
                })
            }

            for (let l = 0; l<node.rules.mustNotHave.length;l++){

                const rule = node.rules.mustNotHave[l];
                links.mustNotHave.push({
                    startId: "node_"+rule,
                    endId: "node_"+node.id
                })
            }

        }


        return links;

    }

    function addNewNodeToLocationWrap({node, targetLocation}) {

        function callback() {

            const newNode = createClearNode(targetLocation)

            moveNodeToLocation({node: newNode, targetLocation})

            if (node.location.y === targetLocation.y){
                newNode.rules.mustHave = [...node.rules.mustHave]
            }
            else {
                newNode.rules.mustHave.push(node.id)
            }

            setNodes([...nodes])

        }

        return callback

    }

    function removeFromList(element, list){
        let index = list.indexOf(element);
        if (index > -1) {
            list.splice(index, 1);
        }

    }

    function updateNodeProperty(){

        if (activeProject !== null){ //TODO чтобы уменьшить нагрузку - в будущем надо слать сами изменения
            const response = oAuth.fetchAPI(variables.backend_url+"/api/project/save/", {
                project_id: activeProject.id,
                nodes: nodes
            })

            if (response.error === 0){

                let newNodesIds = Object.keys(response.new_nodes_ids).sort((a, b) => b - a);

                for (let i = 0; i < newNodesIds.length; i++) {
                    let oldId = newNodesIds[i];
                    let newId = response.new_nodes_ids[oldId];
                    for (let j = nodes.length-1; j >= 0; j--) {
                        if (nodes[j].id === oldId) {
                            nodes[j].id = newId;
                            break;
                        }
                    }
                }


            }
        }

        setNodes([...nodes])


    }

    function deleteNode(node){
        const mustHave = node.rules.mustHave;

        nodes.map((element) => {
            if (element.rules.mustHave.includes(node.id)){
                removeFromList(node.id, element.rules.mustHave);
                element.rules.mustHave = [...element.rules.mustHave, ...mustHave]
            }
        })

        nodes.map((element) => {
            if (element.rules.mustHaveAll.includes(node.id) || element.rules.mustNotHave.includes(node.id)){
                removeFromList(node.id, element.rules.mustHave);
                removeFromList(node.id, element.rules.mustNotHave);
                element.rules.mustHave = [...element.rules.mustHave, ...mustHave]
            }
        })

        removeFromList(node, nodes)

        setActiveNode(null)
        setSelectionMode(null)

        updateNodeProperty()

    }

    function toggleNodeSelection(node, backward=false){

        if (!activeNode || !selectionMode){
            setSelectionMode(null);
            return;
        }

        if (node.id === activeNode.id){
            return;
        }

        if (backward){
            if(node.rules[selectionMode].includes(activeNode.id)){
                removeFromList(activeNode.id, node.rules[selectionMode])
            }
            else {
                node.rules[selectionMode].push(activeNode.id)
            }
        }
        else {
            if(activeNode.rules[selectionMode].includes(node.id)){
                removeFromList(node.id, activeNode.rules[selectionMode])
            }
            else {
                removeFromList(node.id, activeNode.rules["mustHave"])
                removeFromList(node.id, activeNode.rules["mustHaveAll"])
                removeFromList(node.id, activeNode.rules["mustNotHave"])

                activeNode.rules[selectionMode].push(node.id)
            }
        }

        updateNodeProperty()
    }

    function nodeSelectionOutline(node){

        if (!activeNode || !selectionMode){
            return "solid #0000"
        }

        if (activeNode.id === node.id){
            return "dashed #FF0F"
        }

        if (activeNode.rules["mustHave"].includes(node.id)){
            return selectionModes["mustHave"]
        }
        else if (activeNode.rules["mustHaveAll"].includes(node.id)){
            return selectionModes["mustHaveAll"]
        }
        else if (activeNode.rules["mustNotHave"].includes(node.id)){
            return selectionModes["mustNotHave"]
        }

        return "solid #0000"
    }

    return {
        nodes,
        setNodes,
        createClearNode,
        getNodeAtLocation,
        getLayers,
        getWidth,
        moveNodeToCell,
        isAllowedCell,
        getLinks,
        createNewNode: addNewNodeToLocationWrap,

        activeNode,
        setActiveNode,

        updateNodeProperty,
        nodeTypes,

        deleteNode,

        selectionMode,
        setSelectionMode,

        toggleNodeSelection,
        selectionModes,
        nodeSelectionOutline,

        apiError
    }
}

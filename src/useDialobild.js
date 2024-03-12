import {useEffect, useState} from 'react';
import useOAuth from "./useOAuth";
import variables from "./variables.json"

let fetchState = false;


export default function useDialobild() {

    const oAuth = useOAuth()
    const [apiError, setApiError] = useState(null);
    const [projects, setProjects] = useState({})
    const targetProject = "Active";
    const [nodes, setNodes] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [activeNode, setActiveNode] = useState(null)
    const [selectionMode, setSelectionMode] = useState(null)
    const [nodeTypes, setNodeTypes] = useState({})
    const [ruleTypes, setRuleTypes] = useState({})
    const [defaultRuleType, setDefaultRuleType] = useState(null)
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    useEffect( () => {

        async function fetchData(){

            if (!fetchState){
                fetchState = true;

                console.log(sessionStorage.getItem('DiabildAuthCodeChallenge'), sessionStorage.getItem('DiabildAuthCodeVerifier'))

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
                    }
                }

                if (response){
                    setProjects(response)


                    // TODO: Когда фронт будет приклеен к бэку - доставать targetProject из ссылки
                    let activeProjectId = Object.keys(response).find(key => response[key] === targetProject);

                    if (!activeProjectId) {
                        activeProjectId = Object.keys(response).pop();
                    }

                    setActiveProject({
                        id: activeProjectId,
                        name: response[activeProjectId]
                    })


                    const project = await oAuth.fetchAPI(`${variables.backend_url}/api/project/id/${activeProjectId}/`)

                    nodes.length = 0
                    nodes.push(...project.nodes)

                    setNodeTypes(project.nodeTypes.reduce((acc, obj) => { //TODO нужно переделать так, чтобы обозначения можно было читать везде
                        acc[obj.code] = {
                            color:obj.color,
                            name:obj.name
                        };
                        return acc;
                    }, {}))

                    setRuleTypes(project.ruleTypes.reduce((acc, type) => {
                        acc[type.code] = {
                            name: type.name,
                            color: type.color,
                            arrowStyle: type.arrowStyle
                        };
                        return acc;
                    }, {}));

                    setDefaultRuleType(project.defaultRuleType)

                    updateNodeProperty()
                }
            }
        }
        fetchData().then(r => null);
    }, [])

    function toggleSettingOpen(){
        setIsSettingOpen(!isSettingOpen);
    }
    function createClearNode({x, y}) {

        const id = nodes.length === 0 ? 1 : Math.max(...nodes.map(node => node.id)) + 1;

        const targetLocation = {x: x?x:1, y: y?y:1}

        while(getNodeAtLocation(targetLocation.x, targetLocation.y)) {
            targetLocation.x++;
        }

        const nodeType = Object.keys(nodeTypes)[0];
        const content = '???';
        const rules = Object.keys(ruleTypes).reduce((acc, type) => {
            acc[type] = [];
            return acc;
        }, {});

        const newNode = { id, location:targetLocation, nodeType, content, rules };

        nodes.push(newNode); // TODO: может перенести это во внешние функции?

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
    function isAllowedCell({draggingNode, cellLocation, over}){
        const node = getNodeAtLocation((cellLocation.x+1) / 2, cellLocation.y)
        if (draggingNode){
            if (node && node.location === activeNode.location){
                return false;
            }
            if (draggingNode.rect.current.initial !== null && draggingNode.rect.current.translated !== null && JSON.stringify(draggingNode.rect.current.initial) !== JSON.stringify(draggingNode.rect.current.translated)){
                return !(activeNode.location.y === cellLocation.y && Math.abs((activeNode.location.x * 2 - 1) - cellLocation.x) === 1)
            }
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
        const node = active.data.current.node;
        const cellLocation = over.data.current.cellLocation;
        if (!isAllowedCell({draggingNode: active, cellLocation: cellLocation} ) || (over.data.current.node && node.id === over.data.current.node.id)){
            return;
        }
        let targetLocation = {x: Math.floor(cellLocation.x/2)+1, y:cellLocation.y};
        moveNodeToLocation({node, targetLocation});

    }
    function getLinks() {
        const links = Object.keys(ruleTypes).reduce((acc, type) => {
            acc[type] = [];
            return acc;
        }, {});
        for (let i = 0; i<nodes.length; i++){
            let node = nodes[i];
            if (node.location.x === 0 || node.location.y === 0){
                continue;
            }
            let noRules = true;
            for (let key in ruleTypes) {
                for (let l = 0; l<node.rules[key].length;l++){
                    const rule = node.rules[key][l];
                    noRules = false;
                    links[key].push({
                        startId: "node_"+rule,
                        endId: "node_"+node.id
                    })
                }
            }
            if (noRules && defaultRuleType){
                links[defaultRuleType].push({
                    startId: "createClearNode",
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
            if (defaultRuleType !== null){
                if (node.location.y === targetLocation.y){
                    for (let ruleType in ruleTypes){
                        newNode.rules[ruleType] = [...node.rules[ruleType]]
                    }
                    newNode.nodeType = node.nodeType;
                }
                else {
                    newNode.rules[defaultRuleType].push(node.id)
                }
            }
            setActiveNode(newNode);
            updateNodeProperty();
            setIsSettingOpen(true);
        }
        return callback;
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
        nodes.map((element) => {
            let inRules = false
            for (let ruleType in ruleTypes){
                if (element.rules[ruleType].includes(node.id)){
                    removeFromList(node.id, element.rules[ruleType]);
                    inRules = true;
                }
            }
            if (inRules){
                for (let ruleType in ruleTypes){
                    element.rules[ruleType] = [...new Set([...element.rules[ruleType], ...node.rules[ruleType]])];
                }
            }
        })

        removeFromList(node, nodes);
        setActiveNode(null);
        setSelectionMode(null);
        updateNodeProperty();
    }
    function toggleNodeSelection(node){

        if (!activeNode || !selectionMode){
            setSelectionMode(null);
            return;
        }
        if (node.id === activeNode.id){
            return;
        }
        if (activeNode.rules[selectionMode].includes(node.id)){
            removeFromList(node.id, activeNode.rules[selectionMode]);
        }
        else {
            for (let ruleType in ruleTypes){
                if (ruleType === selectionMode){
                    activeNode.rules[selectionMode].push(node.id);
                }
                else {
                    removeFromList(node.id, activeNode.rules[ruleType]);
                }
            }
        }
        updateNodeProperty();
    }
    function nodeSelectionOutline(node){

        if (activeNode !== null && activeNode.id === node.id){
            return "solid #FF0F"
        }
        if (!activeNode || !selectionMode){
            return "solid #0000"
        }
        if (activeNode.id === node.id){
            return "dashed #FF0F"
        }
        for (let key in ruleTypes) {
            if (activeNode.rules[key].includes(node.id)){
                return (ruleTypes[key].arrowStyle === "solid"? "solid ": "dashed ")+ruleTypes[key].color;
            }
        }
        return "solid #0000";
    }
    function createClearAndSave() {
        const newNode = createClearNode({x: 0, y:0})
        updateNodeProperty()

    }
    async function sendRawNodes(text) {
        if (activeProject !== null){
            const response = await oAuth.fetchAPI(variables.backend_url+"/api/project/add_raw_nodes/", {
                project_id: activeProject.id,
                active_node: activeNode.id,
                text
            })

            if (response.error === 0){

                for (let nodeId = 0; nodeId < response.update.length; nodeId++){

                    let node = response.update[nodeId];

                    let foundNode = nodes.find(n => n.id === node.id);

                    if (foundNode) {
                        foundNode.location = node.location; // Обновляем объект, если он найден
                    } else {
                        nodes.push(node); // Добавляем node в список, если он не найден
                    }
                }

            }
        }

        setNodes([...nodes])
    }

    return {
        nodes,
        setNodes,
        createClearNode: createClearAndSave,
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
        nodeSelectionOutline,

        apiError,

        ruleTypes,

        isSettingOpen,
        toggleSettingOpen,

        projects,
        setApiError,
        activeProject,

        sendRawNodes
    }
}

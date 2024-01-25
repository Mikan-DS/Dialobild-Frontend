export default class NodePropertyManager {
    constructor(nodeProperties = [], nodeLinks = []) {
        this.nodeProperties = nodeProperties;
        this.nodeLinks = nodeLinks;
    }

    getNodePropertyById(id) {
        return this.nodeProperties.find(nodeProperty => nodeProperty.id === id);
    }

    getRenderNodeListByNodeProperties() {
        let renderList = [];
        this.nodeProperties.forEach(nodeProperty => {
            let layerIndex = renderList.findIndex(layer => layer[0] === `layer_${nodeProperty.location.x}`);
            if (layerIndex === -1) {
                renderList.push([`layer_${nodeProperty.location.x}`, [ `node_${nodeProperty.id}` ]]);
            } else {
                renderList[layerIndex][1].push(`node_${nodeProperty.id}`);
                renderList[layerIndex][1].sort();
            }
        });
        return renderList;
    }

}

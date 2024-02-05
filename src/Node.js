import React from 'react';
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

export default function Node({node, dialobild}) {


    const nodeId = "node_"+node.id;

    const {attributes, listeners, setNodeRef, transform, active} = useDraggable({
        id: nodeId,
        data: {node}
    });



    let nodeContent = node.content;

    if (nodeContent.length > 80) {
        nodeContent = nodeContent.substring(0, 77) + '...';
    }

    let nodeWidth = 100;

    if (node && nodeContent.length > 10){
        nodeWidth = 250;
        if (nodeContent.length > 56){
            nodeWidth = 350;
        }
    }

    // console.log(dialobild.nodeTypes, node.nodeType)

    const style = {
        backgroundColor: dialobild.nodeTypes[node.nodeType],
        borderRadius: '10px',
        width: nodeWidth,
        minHeight: '50px',
        maxHeight: 100,
        padding: 10,

        transform: CSS.Translate.toString(transform),
    };

    const holderStyle = {
        display: "inline-flex"
    }

    const buttonStyle = {
        width: 30,
        height: 30,
        padding: 5,
        visibility: active? "hidden": "visible",
        alignSelf: "center",

        border: "none",
        background: "transparent"

    }

    const location = node.location

    return (
        <div className="NodeHolder" style={holderStyle}>
            <button style={buttonStyle} onClick={dialobild.createNewNode({node, targetLocation:{x: location.x-1, y: location.y}})}>+</button>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div id={nodeId} style={style} className="Node" ref={setNodeRef} {...listeners} {...attributes}>
                    {nodeContent}
                </div>
                <button style={buttonStyle} onClick={dialobild.createNewNode({node, targetLocation:{x: location.x, y: location.y+1}})}>+</button>
            </div>
            <button style={buttonStyle} onClick={dialobild.createNewNode({node, targetLocation:{x: location.x+1, y: location.y}})}>+</button>

        </div>
    );
}

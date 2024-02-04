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

    // nodeContent += "dhoiasio iojasdoij djioasi jodjioasj djiasjd oaisjd oijas oidjasoij dpasojd opasjd";

    if (nodeContent.length > 120) {
        nodeContent = nodeContent.substring(0, 117) + '...';
    }

    let nodeWidth = 100;

    if (node && nodeContent.length > 20){
        nodeWidth = 250;
        if (nodeContent.length > 70){
            nodeWidth = 350;
        }
    }

    const style = {
        backgroundColor: '#93af93',
        borderRadius: '10px',
        width: nodeWidth,
        minHeight: '50px',
        maxHeight: 100,
        padding: 10,
        // height: 100,

        transform: CSS.Translate.toString(transform),
    };

    const styleHolder = {
        display: "inline-flex",
        // minWidth: 100,
        // maxWidth: 400,
        // width: "auto"
    }

    const buttonStyle = {
        width: 30,
        height: 30,
        padding: 5,
        visibility: active? "hidden": "visible",
        alignSelf: "center"
    }

    const location = node.location

    return (
        <div className="NodeHolder" style={styleHolder}>
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

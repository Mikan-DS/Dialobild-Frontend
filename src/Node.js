import React from 'react';
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

export default function Node({node, dialobild}) {


    const nodeId = "node_"+node.id;

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: nodeId,
        data: {node}
    });

    const style = {
        backgroundColor: '#93af93',
        borderRadius: '10px',
        minWidth: '100px',
        minHeight: '50px',
        padding: 10,

        transform: CSS.Translate.toString(transform),
    };

    return (
        <div className="NodeHolder">
            <div id={nodeId} style={style} className="Node" ref={setNodeRef} {...listeners} {...attributes}>
                {node.content}
            </div>
        </div>
    );
}

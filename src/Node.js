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
        backgroundColor: 'grey',
        borderRadius: '10px',
        width: '100px',
        height: '50px',

        transform: CSS.Translate.toString(transform),
    };

    return (
        <div id={nodeId} style={style} className="Node" ref={setNodeRef} {...listeners} {...attributes}>
            {/*<Xarrow start="createClearNode" end={"node_"+props.node.id}></Xarrow>*/}
        </div>
    );
}

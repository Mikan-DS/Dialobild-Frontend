import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function Node(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: "node_"+props.id, data: {'node_id': props.id}
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        minHeight: '100px', width: '300px', backgroundColor: props.typeColor, borderRadius: '25px', margin: '10px',
        transform: CSS.Translate.toString(transform),
    };


    return (
        <button className="Node"
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={style}>
            Нода {props.id}

        </button>

    );


}


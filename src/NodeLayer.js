import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function NodeLayer(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    const style = {

        minHeight: '200px', width: 'auto', borderRadius: '25px', margin: '10px',
        backgroundColor: isOver ? '#AAAA' : '#AAA9',

    };


    return (
        <div ref={setNodeRef} className="NodeLayer" style={style}>
            {props.children}
        </div>
    );
}

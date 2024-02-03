import React from 'react';
import Node from './Node';
import {useDroppable} from "@dnd-kit/core";

export default function Cell({dialobild, cellLocation}) {

    const node = dialobild.getNodeAtLocation((cellLocation.x+1) / 2, cellLocation.y)

    const cellId = "cell_"+cellLocation.x+"_"+cellLocation.y

    const {setNodeRef, over} = useDroppable({
        id: cellId,
        // disabled: node
        data: {cellLocation}
    })

    const isOver = over&&over.id===cellId

    const style = {
        backgroundColor: isOver? 'lightpink' : "#F991",//undefined,
        minHeight: '100%',
        minWidth: '30px',
        display: "flex"
    };
    return (
        <div ref={setNodeRef} id={cellId} style={style} className="Cell">
            {node && <Node node={node} dialobild={dialobild} />}
        </div>
    );
}

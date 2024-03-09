import React from 'react';
import Node from './Node';
import {useDroppable} from "@dnd-kit/core";

export default function Cell({dialobild, cellLocation}) {

    const node = dialobild.getNodeAtLocation((cellLocation.x+1) / 2, cellLocation.y)
    const cellId = "cell_"+cellLocation.x+"_"+cellLocation.y
    const {setNodeRef, over, active} = useDroppable({
        id: cellId,
        data: {cellLocation, node}
    })
    let isOver = over&&over.id===cellId
    let isDisabled = !dialobild.isAllowedCell({draggingNode:active, cellLocation:cellLocation, over})
    const style = {
        backgroundColor: isDisabled? undefined: (isOver? 'lightpink': "#F991"),
        minWidth: '30px',
        display: "flex",
        alignSelf: "stretch"
    };
    return (
        <div ref={setNodeRef} id={cellId} style={style} className="Cell">
            {node && <Node node={node} dialobild={dialobild} />}
        </div>
    );
}

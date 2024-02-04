import React from 'react';
import Node from './Node';
import {useDroppable} from "@dnd-kit/core";

export default function Cell({dialobild, cellLocation}) {

    const node = dialobild.getNodeAtLocation((cellLocation.x+1) / 2, cellLocation.y)

    const cellId = "cell_"+cellLocation.x+"_"+cellLocation.y

    const {setNodeRef, over, active} = useDroppable({
        id: cellId,
        // disabled: node
        data: {cellLocation, node}
    })

    const isOver = over&&over.id===cellId

    const isDisabled = !dialobild.isAllowedCell({activeNode:active, cellLocation:cellLocation})//node || (active && active.data.current.node.location.y === cellLocation.y && Math.abs((active.data.current.node.location.x * 2 - 1) - cellLocation.x) === 1)

    const style = {
        backgroundColor: isDisabled? undefined: (isOver? 'lightpink': "#F991"),//isOver? 'lightpink' : (active? "#F993": undefined),
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

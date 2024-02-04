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

    let isOver = over&&over.id===cellId

    let isDisabled = !dialobild.isAllowedCell({activeNode:active, cellLocation:cellLocation})//node || (active && active.data.current.node.location.y === cellLocation.y && Math.abs((active.data.current.node.location.x * 2 - 1) - cellLocation.x) === 1)


    // isOver = true;
    // isDisabled = false;

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

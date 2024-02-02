import React from 'react';
import Xarrow from "react-xarrows";

export default function Node(props) {
    const style = {
        backgroundColor: 'grey',
        borderRadius: '10px',
        width: '100px',
        height: '50px',
    };

    return (
        <div id={"node_"+props.node.id} style={style} className="Node">
            <Xarrow start="createClearNode" end={"node_"+props.node.id}></Xarrow>
        </div>
    );
}

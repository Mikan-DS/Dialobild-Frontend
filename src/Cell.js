import React from 'react';
import Node from './Node';

export default function Cell(props) {
    const style = {
        backgroundColor: 'lightpink',
        minHeight: '100%',
        minWidth: '100px',
        width: "100px"
    };
    return (
        <div style={style} className="Cell">
            {props.node && <Node node={props.node} dialobild={props.dialobild} />}
        </div>
    );
}

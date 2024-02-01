import React from 'react';
import Cell from './Cell';

export default function Layer(props) {
    const style = {
        borderRadius: '10px',
        backgroundColor: 'beige',

        // padding: 20,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //
        marginTop: "20px",
        // width: 3333,

        //
        minWidth: "100%",



        // width: "100px",
        // width: "100%",
        //
        minHeight: '70px',
        height: '1px',
        //
        gap: "10px",

    };


    return (
        <div style={style} className="Layer">
            {props.layer.nodes.map((node, index, arr) => {
                const isLast = index === arr.length - 1;
                return (
                    <React.Fragment key={node.id}>
                        {index === 0 && <Cell dialobild={props.dialobild} />}
                        <Cell node={node} dialobild={props.dialobild} />
                        {(!isLast || (isLast && node)) && <Cell dialobild={props.dialobild} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

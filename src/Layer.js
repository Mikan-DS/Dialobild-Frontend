import React from 'react';
import Cell from './Cell';

export default function Layer({layer, dialobild}) {
    const style = {
        borderRadius: '10px',
        // backgroundColor: 'beige',

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
        <div id={"layer_" + layer.y}  style={style} className="Layer">
            {/*{props.layer.nodes.map((node, index, arr) => {*/}
            {/*    const isLast = index === arr.length - 1;*/}
            {/*    return (*/}
            {/*        <React.Fragment key={node.id}>*/}
            {/*            {index === 0 && <Cell dialobild={props.dialobild} />}*/}
            {/*            <Cell node={node} dialobild={props.dialobild} />*/}
            {/*            {(!isLast || (isLast && node)) && <Cell dialobild={props.dialobild} />}*/}
            {/*        </React.Fragment>*/}
            {/*    );*/}
            {/*})}*/}
            {/*{props.layer.nodes.length===0 && <Cell dialobild={props.dialobild} />}*/}
            <Cell dialobild={dialobild} cellLocation={{x:0, y:layer.y}}></Cell>
            {Array.from({ length: dialobild.getWidth() }, (_, index) => {
                index = index+1;
                let node = dialobild.getNodeAtLocation(index, layer.y);
                return (
                    <React.Fragment key={"nodeFragment_" + index}>
                        <Cell node={node} dialobild={dialobild} cellLocation={{x: index*2-1, y: layer.y}}/>
                        <Cell dialobild={dialobild} cellLocation={{x: index*2, y: layer.y}} />
                    </React.Fragment>
                )
            })}


        </div>
    );
}

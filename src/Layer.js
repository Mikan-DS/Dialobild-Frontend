import React from 'react';
import Cell from './Cell';

export default function Layer({layer, dialobild}) {
    const style = {
        borderRadius: '10px',
        // backgroundColor: 'beige',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        minWidth: "100%",

        minHeight: '70px',
        height: 'max-content',
        //
        flexDirection: "row",

        // gap: 10,
    };


    return (
        <div id={"layer_" + layer.y}  style={style} className="Layer">

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

import React from 'react';
import Layer from './Layer';

export default function DialobildCanvas(props) {
    const style = {
        overflowX: 'auto',
        // minWidth: '100%',
        width: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        // overflowY: 'auto',
        // minWidth: '50%',
        // minHeight: '100%',
        // display: 'flex',
        // flexDirection: "column",

        justifyContent: 'center',
        alignItems: 'center',
    };


    const styleContainer = {
        flexWrap: 'wrap',
        display: 'flex',
        // minWidth: '100%',

        // flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    };


    return (
        <div style={style} className="DialobildCanvas">
            <div style={styleContainer}>
                <button onClick={props.dialobild.createClearNode}>Создать</button>
                {props.dialobild.getLayers().map((layer, index) => (
                    <Layer key={"layer_" + layer.y} layer={layer} dialobild={props.dialobild}/>
                ))}
            </div>

        </div>
    );
}

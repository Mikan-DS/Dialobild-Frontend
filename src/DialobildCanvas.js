import React from 'react';
import Layer from './Layer';

export default function DialobildCanvas(props) {
    const style = {
        overflowX: 'auto',
        // width: 'auto'
        // overflowY: 'auto',
        minWidth: '50%',
        // minHeight: '100%',
        // display: 'flex',
        // flexDirection: "column"
    };

    return (
        <div style={style} className="DialobildCanvas">
            <button onClick={props.dialobild.createClearNode}>Создать</button>
            {props.dialobild.getLayers().map((layer, index) => (
                <Layer key={"layer_" + layer.y} layer={layer} dialobild={props.dialobild}/>
            ))}
        </div>
    );
}

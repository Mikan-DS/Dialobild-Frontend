import React, {useEffect, useState} from 'react';
import Layer from './Layer';
import Xarrow, {useXarrow, Xwrapper} from "react-xarrows";
import NodeArrow from "./NodeArrow";

export default function DialobildCanvas(props) {
    const style = {
        overflowX: 'auto',
        // minWidth: '100%',
        width: 'auto',
        display: 'flex',
        flexWrap: 'wrap',

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

    const updateXarrow = useXarrow();

    const [isArrowUpdated, setArrowUpdated] = useState(true)

    function withUpdateScreen(action) {

        function updateScreen(){

            action();
            // updateXarrow();
            // setArrowUpdated(!isArrowUpdated)
        }

        return updateScreen

    }

    // useEffect(() => {
    //
    //     setArrowUpdated(!isArrowUpdated)
    //
    // }, [
    //     document.getElementById("DialobildCanvasContainer") && document.getElementById("DialobildCanvasContainer").getBoundingClientRect().width,
    //     document.getElementById("DialobildCanvasContainer") && document.getElementById("DialobildCanvasContainer").getBoundingClientRect().x,
    //     document.getElementById("DialobildCanvas") && document.getElementById("DialobildCanvas").getBoundingClientRect().width,
    //     document.getElementById("DialobildCanvas") && document.getElementById("DialobildCanvas").getBoundingClientRect().x
    //
    // ]);
    //
    // // console.log(document.getElementById("DialobildCanvasContainer") && document.getElementById("DialobildCanvasContainer").getBoundingClientRect())
    //
    // const [currentName, setCurrentName] = useState("TEST")
    // //
    // useEffect(() => {
    //     console.log(currentName)
    //     if (isArrowUpdated){
    //         setArrowUpdated(false);
    //         setCurrentName(currentName+"1")
    //     }
    // });


    return (
        <div style={style} className="DialobildCanvas" id="DialobildCanvas">
            <div style={styleContainer}  id="DialobildCanvasContainer">
                <Xwrapper>

                    <button id="createClearNode" onClick={withUpdateScreen(props.dialobild.createClearNode)}>
                        Создать
                    </button>
                    {props.dialobild.getLayers().map((layer, index) => (
                        <Layer key={"layer_" + layer.y} layer={layer} dialobild={props.dialobild}/>
                    ))}
                </Xwrapper>
            </div>
            <NodeArrow startId="createClearNode" endId="node_1"></NodeArrow>
            {/*{currentName} nodeState={isArrowUpdated}*/}
        </div>
    );
}

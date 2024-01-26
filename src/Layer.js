import React from "react";
import Node from "./Node";


export default function Layer(props) {
    // console.log(props.layer)
    return (
        <div className="Layer">
            {
                props.layer.map(
                    (node) => (<Node id={node}></Node>)
                )
            }
        </div>
    )

}
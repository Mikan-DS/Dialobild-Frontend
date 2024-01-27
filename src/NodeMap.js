import {DndContext} from "@dnd-kit/core";
import Layer from "./Layer";


export default function NodeMap(props){


    return (
        <div className="NodeMap">
            <DndContext className="NodeMap" onDragStart={props.nodes.nodeClickHandler}>

                {

                    props.nodes.layeredNodes().map(
                        (layer) => (<Layer layer={layer}/>)
                    )


                }
                <svg width="500" height="500">
                    <path d="M100 40 Q100 100 100 100" stroke="black" fill="transparent"/>
                </svg>

            </DndContext>
        </div>
    )
}
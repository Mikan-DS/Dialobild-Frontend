import {DndContext} from "@dnd-kit/core";
import Layer from "./Layer";


export default function NodeMap(props){


    return (
        <div className="NodeMap">
            <DndContext className="NodeMap" onDragStart={props.nodes.nodeClickHandler}>
                TEST
                {

                    props.nodes.layeredNodes().map(

                        (layer) => (<Layer layer={layer}/>)


                    )


                }


            </DndContext>
        </div>
    )
}
import {DndContext} from "@dnd-kit/core";
import Layer from "./Layer";
import Xarrow, {useXarrow} from "react-xarrows";


export default function NodeMap(props){

    const updateXarrow = useXarrow();

    const links = props.nodes.getLinks();

    return (
        <div className="NodeMap">
            <DndContext className="NodeMap" onDragStart={props.nodes.nodeClickHandler} onDragEnd={updateXarrow} onDragMove={updateXarrow}>

                {

                    props.nodes.layeredNodes().map(
                        (layer) => (<Layer layer={layer}/>)
                    )


                }
                {/*<svg width="500" height="500">*/}
                {/*    <path d="M100 40 Q100 100 100 100" stroke="black" fill="transparent"/>*/}
                {/*</svg>*/}

                {
                    links.must_have.map(
                        ([startFrom, endOn]) => (
                            <Xarrow path="grid"
                                    start={startFrom}
                                    end={endOn}
                            />
                        )
                    )
                }

                {/*{*/}
                {/*    links.disallow.map(*/}
                {/*        ([startFrom, endOn]) => (*/}
                {/*            <Xarrow path="grid"*/}
                {/*                    start={startFrom}*/}
                {/*                    end={endOn}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    )*/}
                {/*}*/}

            </DndContext>
        </div>
    )
}
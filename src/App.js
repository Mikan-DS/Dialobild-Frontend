import React, {useState} from 'react';
import './App.css';
import DnDExample from "./DnDExample";
import DialobildCanvas from "./DialobildCanvas";
import useNodes from "./useNodes";
import NodeMap from "./NodeMap";
import NodePreview from "./NodePreview";


function App() {


    const nodes = useNodes()



    return (
    <div className="App">

        <NodeMap nodes={nodes}/>
        <NodePreview nodes={nodes}/>

    </div>
    );

}



export default App;

import React, {useState} from 'react';
import './App.css';
import DnDExample from "./DnDExample";
import DialobildCanvas from "./DialobildCanvas";



function App() {




    const initialLayers = [["layer_1", ["node_1", "node_2", "node_3", "node_4"]], ["layer_2", []]]

    const [layers, setLayers] = useState(initialLayers)

    return (
    <div className="App">
        <button id="add_node" onClick={AddNode}>
            NEW
        </button>
        <DialobildCanvas layersControl={[layers, setLayers]}/>

    </div>
    );


    function AddNode(){

    }


}



export default App;

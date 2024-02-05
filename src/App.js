import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";
import NodeSettings from "./NodeSettings";

function App() {

    const dialobild = useDialobild()

    document.dd = dialobild;

    return (
    <div className="App">

        <DialobildCanvas dialobild={dialobild}/>
        <NodeSettings dialobild={dialobild}/>
        {/*<DebugContainer/>*/}
        {/*<CanvasButton></CanvasButton>*/}

    </div>
    );

}



export default App;

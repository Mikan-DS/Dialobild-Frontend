import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";

function App() {

    const dialobild = useDialobild()

    document.dd = dialobild;

    return (
    <div className="App">

        <DialobildCanvas dialobild={dialobild}/>
        {/*<DebugContainer/>*/}
        {/*<CanvasButton></CanvasButton>*/}

    </div>
    );

}



export default App;

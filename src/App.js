import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";
import NodeSettings from "./NodeSettings";

function App() {

    console.log("RERENDER")

    const dialobild = useDialobild()

    document.dd = dialobild;

    return (
    <div className="App">

        {dialobild.apiError ? (
            <p>{dialobild.apiError}</p>
        ) : (
            <>
                <DialobildCanvas dialobild={dialobild}/>
                <NodeSettings dialobild={dialobild}/>
            </>
        )}


        {/*<DebugContainer/>*/}
        {/*<CanvasButton></CanvasButton>*/}

        <a href="/?startagain">Обновить</a>

    </div>
    );

}



export default App;

import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";
import NodeSettings from "./NodeSettings";

function App() {

    const dialobild = useDialobild()

    document.dd = dialobild; //TODO: only for debug

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

        <a href="/?startagain">Обновить</a>

    </div>
    );

}



export default App;

import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";
import DebugContainer from "./DebugContainer";


function App() {

    const dialobild = useDialobild()

    return (
    <div className="App">

        <DialobildCanvas dialobild={dialobild}/>
        {/*<DebugContainer/>*/}

    </div>
    );

}



export default App;

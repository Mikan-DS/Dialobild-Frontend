import './App.css';
import DialobildCanvas from "./DialobildCanvas";
import useDialobild from "./useDialobild";
import NodeSettings from "./NodeSettings";
import SideMenu from "./SideMenu";

export default function App() {

    const dialobild = useDialobild()

    document.dd = dialobild; //TODO: only for debug

    return (
    <div className="App">
        {dialobild.activeProject === null ? (
            <div>{dialobild.apiError?
                <p>Проект не загружен: {dialobild.apiError}</p>:
                <p>Загрузка...</p>
            }</div>
        ) : (
            <>
                <DialobildCanvas dialobild={dialobild}/>
                <NodeSettings dialobild={dialobild}/>
                <SideMenu dialobild={dialobild}/>
            </>
        )}
        <a href="/?startagain">Обновить</a>
    </div>
    );
}
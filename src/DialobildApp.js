import {Link, useParams} from "react-router-dom";
import DialobildCanvas from "./DialobildCanvas";
import NodeSettings from "./NodeSettings";
import SideMenu from "./SideMenu";
import UpperMenu from "./UpperMenu";

export default function DialobildApp({dialobild}) {

    const {projectId} = useParams()

    if (dialobild.activeProject === null){
        dialobild.fetchProject(projectId).then();
    }

    return <div className="DialobildApp">
        <UpperMenu dialobild={dialobild}/>
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
    </div>
}
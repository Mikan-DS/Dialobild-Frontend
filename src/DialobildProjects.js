import {Link} from "react-router-dom";

export default function DialobildProjects({dialobild}) {

    return <div className="DialobildProjects">
        {Object.keys(dialobild.projects).map(projectId =>
            <a key={"project_"+projectId} href={"projects/"+projectId} style={{display: "block"}}>
                {dialobild.projects[projectId]}
            </a>
        )}
    </div>
}
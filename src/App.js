import './App.css';
import useDialobild from "./useDialobild";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DialobildProjects from "./DialobildProjects";
import DialobildApp from "./DialobildApp";

export default function App() {

    const dialobild = useDialobild()

    // document.dd = dialobild; //TODO: only for debug

    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DialobildProjects dialobild={dialobild}/>}/>
                <Route path="/projects/:projectId" element={<DialobildApp dialobild={dialobild}/> }/>
            </Routes>
        </BrowserRouter>

        {/*<a href="/?startagain">Обновить</a>*/}
    </div>
    );
}
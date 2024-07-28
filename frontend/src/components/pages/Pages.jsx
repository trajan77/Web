import Header from "../header/Header"
import Home from "../home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Team from "../team/Team.jsx";
import Project from "../project/Project.jsx";

const Pages = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/team' element={<Team/>}/>
                    <Route exact path='/project' element={<Project/>}/>
                </Routes>
            </Router>
        </>

    )
}

export default Pages
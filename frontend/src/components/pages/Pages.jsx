import Home from "../home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "../team/Team.jsx";
import Project from "../project/Project.jsx";

// eslint-disable-next-line react/prop-types
const Pages = ({userTeam ,loggedInUser}) => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/team' element={<Team userTeam={userTeam} loggedInUser={loggedInUser} />} />
                <Route exact path='/project' element={<Project />} />
            </Routes>
        </Router>
    );
};


export default Pages;
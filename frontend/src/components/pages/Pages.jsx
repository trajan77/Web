import Home from "../home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "../team/Team.jsx";
import Project from "../project/Project.jsx";

// eslint-disable-next-line react/prop-types
const Pages = ({userTeam ,loggedInUser}) => {
    console.log(111);
    return (
        <Router basename='/'>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/team' element={<Team userTeam={userTeam} loggedInUser={loggedInUser} />} />
                <Route exact path='/project' element={<Project teamId={userTeam} userName={loggedInUser} />} />
            </Routes>
        </Router>
    );
};


export default Pages;
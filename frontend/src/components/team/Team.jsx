import './Team.css';
import Intro from "./Intro.jsx";
import Members from "./Members.jsx";

// eslint-disable-next-line react/prop-types
const Team = ({userTeam, loggedInUser}) => {
    console.log("team")
    return (
        <div className="team">
                <Intro
                    userTeam={userTeam}
                    name = {loggedInUser}
                />
                <Members userTeam={userTeam} name={ loggedInUser} />
        </div>
    );
};


export default Team;
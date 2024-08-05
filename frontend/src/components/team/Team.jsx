import './Team.css';
import Intro from "./Intro.jsx";
import Members from "./Members.jsx";
import Create from "./Create.jsx";
import NiceModal from "@ebay/nice-modal-react";

const Team = (userTeam, loggedInUser) => {
    return (
        <div className="team">
            <Intro
                userTeam={userTeam}
                user={loggedInUser}
                onShowCreateModal={() => NiceModal.show(Create, { username: loggedInUser })}
            />
            <Members userTeam={userTeam} user={loggedInUser} />
        </div>
    );
};


export default Team;
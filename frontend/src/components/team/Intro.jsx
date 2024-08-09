import "./Team.css";
import Create from "./Create.jsx";
import NiceModal from "@ebay/nice-modal-react";
import {useEffect, useState} from "react";
import {getTeam} from "../../request/util.request.jsx";

// eslint-disable-next-line react/prop-types
const Intro = ({userTeam, name}) => {
    const [intro, setIntro] = useState(null);
    const [teamname, setTeamName] = useState(null);
    const showCreateModal = () => {
        NiceModal.show(Create, { user: name });
    };
    useEffect(() => {
        if(userTeam !== 0){
            getTeam(userTeam).then(team => {
                setIntro(team.intro);
                setTeamName(team.name);
            })
        }
    }, [userTeam, name]);
    return (
            <div className="intro">
                {userTeam === 0 ? (
                    <div>
                        <h4 className="tip1">您还未加入团队，请等待组长邀请或创建团队</h4>
                        <button className="intro_button" disabled={!name} onClick={showCreateModal}>
                            创建团队
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3 className="teamname">{teamname}</h3>
                        <div className="introduce">{intro}</div>
                    </div>
                )}
            </div>
    );
};


export default Intro;
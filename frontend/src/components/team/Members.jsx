import "./Team.css";
import {useEffect, useState} from "react";
import {getMembers} from "../../request/util.request.jsx";
import NiceModal from "@ebay/nice-modal-react";
import Invite from "./Invite.jsx";
import Go from "./Go.jsx";

// eslint-disable-next-line react/prop-types
const Members = ({userTeam,name}) => {
    const [members, setMembers] = useState([]);
    const showInviteModal = () => {
        NiceModal.show(Invite, { teamID: userTeam})
    };
    const showGoModal = () => {
        NiceModal.show(Go, { name: name})
    };

    useEffect(() => {
        if (userTeam) {
            getMembers(userTeam).then(userTeam => {
                    setMembers(userTeam);
                }
            )
        }
    }, [userTeam,name])

    return (
        <div className="members">
            {userTeam === 0 ? (
                <div>
                    <h3 className="tip1">请加入团队以使用全部功能</h3>
                </div>)
                :
                (
                    <div>
                        <h3 className="title">团队成员</h3>
                        <ul>
                            {members && members.map((member, index) => (
                                <li className="username" key={index}>{member}</li>
                            ))}
                        </ul>
                        <button className="intro_button" disabled={!name} onClick={showInviteModal}>邀请成员</button>
                        <button className="intro_button" disabled={!name} onClick={showGoModal}>退出团队</button>
                    </div>
                )}
        </div>
    )
}

export default Members
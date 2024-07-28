import Intro from "./Intro.jsx";
import Members from "./members.jsx";
import "./Team.css"
const Teams = () => {

    return (
        <>
            <div className="team">
                <Intro></Intro>
                <Members></Members>
            </div>
        </>
    )
}

export default Teams
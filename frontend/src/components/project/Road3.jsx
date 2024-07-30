import "./project.css"
import NiceModal from "@ebay/nice-modal-react";
import Project from "./Window.jsx";
const Road3 = () => {
    return (
        <div className="road3">
            <div className="title3">已经结束</div>
            <button className="addThing" onClick={() => NiceModal.show(Project)}>创建项目</button>
        </div>
    )
}

export default Road3
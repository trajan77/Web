import "./project.css"
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "./Window.jsx";
const Road2 = () => {
    return (
        <div className="road2">
            <div className="title2">正在进行</div>
            <button className="addThing" onClick={() => NiceModal.show(MyModal)}>创建项目</button>
        </div>
    )
}

export default Road2
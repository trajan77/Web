import Thing from "./Thing.jsx";
import "./project.css"
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "./Window.jsx";
const Road1 = () => {
    return (
        <div className="road1">
            <div className="title1">即将开始</div>
            <button className="addThing" onClick={() => NiceModal.show(MyModal)}>创建项目</button>
            <Thing></Thing>
            <Thing></Thing>
        </div>
    )
}

export default Road1
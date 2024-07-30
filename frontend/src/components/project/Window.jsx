import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

const MyModal = NiceModal.create((props) => {
    const { name } = props;
    const modal = useModal();

    const onOk = () => {
        console.log("编写自己的onOk逻辑");
    };

    return (
        <Modal
            title="创建新项目"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
        >
            项目名称: <input>{name}</input>
            项目时间: <input></input>
            项目介绍: <input></input>
            项目分工: <input></input>
</Modal>
)
    ;
});

MyModal.propTypes = {};

export default MyModal;
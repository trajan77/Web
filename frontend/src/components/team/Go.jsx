import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import {teamGo} from "../../request/util.request.jsx";

const MyModal = NiceModal.create(({name}) => {
    const modal = useModal();
    const onOk = async () => {

        const response = await teamGo({name});
        if (response) {
            await modal.hide();
        }
    };

    return (
        <Modal
            title="是否确定退出团队"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="退出"
            cancelText="我点错了"
        >
        </Modal>
    );
});

export default MyModal;
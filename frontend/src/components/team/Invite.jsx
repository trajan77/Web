import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import {inviteMembers} from "../../request/util.request.jsx";
import {useState} from "react";

const MyModal = NiceModal.create(({teamID}) => {
    const modal = useModal();
    const [name, setName] = useState("");
    const onOk = async () => {
        const response = await inviteMembers({teamID,name});
        console.log(response);
        if (response) {
            await modal.hide();
        }
    };

    return (
        <Modal
            title="邀请成员"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="邀请"
            cancelText="算了吧"
        >
            成员名称: <input type="text" onChange={(e) => setName(e.target.value)} />
            邀请成功弹窗自动关闭
        </Modal>
    );
});

export default MyModal;
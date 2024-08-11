import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import { createTeam } from "../../request/util.request.jsx";
import { useState } from "react";

const MyModal = NiceModal.create(( {user}) => {
    const modal = useModal();
    const [team, setTeam] = useState('');
    const [intro, setIntro] = useState('');
    const onOk = async () => {
        const response = await createTeam({ user, team, intro });
        if (response) {
            alert("创建成功 ！ 请刷新 ！")
            await modal.hide();
        }
    };

    return (
        <Modal
            title="创建团队"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="创建"
            cancelText="等会儿"
        >
            团队名称: <input type="text" onChange={(e) => setTeam(e.target.value)} />
            团队介绍: <input type="text" onChange={(e) => setIntro(e.target.value)} />
            创建后可邀请其他成员
            创建后请刷新
        </Modal>
    );
});

export default MyModal;
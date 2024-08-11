import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import {createProject} from "../../request/util.request.jsx";

const AddProject = NiceModal.create(({ teamID}) => {
    const modal = useModal();
    const [name, setName] = useState('');

    const onOk = async () => {
        const response = await createProject({ name, teamID});
        if (response) {
            alert("添加成功 ！ 请刷新 ！")
            await modal.hide();
        }
    };

    return (
        <Modal
            title="创建新项目"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="确定"
            cancelText="不确定"
        >
            <div>
                项目名称: <input value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>创建后请刷新</div>
        </Modal>
    );
});

export default AddProject;
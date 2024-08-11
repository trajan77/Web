import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import {addTask} from "../../request/util.request.jsx";

const AddTaskModal = NiceModal.create(({projectId}) => {
    const modal = useModal();
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [taskData, setTaskData] = useState('');


    const onOk = async () => {
        console.log(projectId,taskName,dueDate);
        const response = await addTask({projectId,taskName,taskData,dueDate});
        if (response) {
            alert("添加成功 ！ 请刷新 ！")
            await modal.hide();
        }
    };

    return (
        <Modal
            title="创建新任务"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="确定"
            cancelText="不确定"
        >
            <div>
                任务名称: <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div>
                任务信息: <input value={taskData} onChange={(e) => setTaskData(e.target.value)}/>
            </div>
            <div>
                截止日期: <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>创建后请刷新</div>
        </Modal>
    );
});

export default AddTaskModal;
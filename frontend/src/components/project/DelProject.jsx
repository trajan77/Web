import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import {delProject} from "../../request/util.request.jsx";

const AddProject = NiceModal.create(({ projectID}) => {
    const modal = useModal();

    const onOk = async () => {
        console.log(projectID)
        const response = await delProject({ projectID :projectID});
        if (response) {
            await modal.hide();
        }
    };

    return (
        <Modal
            title="是否确定删除此项目"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText="删 ！！！"
            cancelText="还是算了吧"
        >
            请谨慎考虑，没存备份
        </Modal>
    );
});

export default AddProject;
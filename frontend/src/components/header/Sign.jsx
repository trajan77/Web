import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import {sendData} from "../../request/util.request.jsx";
import {useState} from "react";

const MyModal = NiceModal.create((props) => {
    const { name } = props;
    const modal = useModal();

    const [username, setUsername] = useState(name);
    const [password, setPassword] = useState('');

    const onOk = async () => {
        try {
            await sendData({ username, password });
            await modal.hide();
        } catch (error) {
            console.error("Failed to send data:", error);
        }
    };

    return (
        <Modal
            title="登录"
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            okText = "登录"
            cancelText = "等会儿"
        >
            <div>
                <div>
                    用户名: <input id="username" type="text" defaultValue={name} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    密码: <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>首次登录自动注册</div>
            </div>
        </Modal>
    )
        ;
});

MyModal.propTypes = {};

export default MyModal;
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import {sign} from "../../request/util.request.jsx";
import {useState} from "react";

const Sign = NiceModal.create(({ onLoginSuccess }) => {
    const modal = useModal();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onOk = async () => {
        try {
            if(username === "" || password === "") {
                alert("用户名和密码不能为空")
                return;
            }
            if(username.length < 3) {
                alert("用户名和密码至少三个字符")
                return;
            }
            if(password.length < 3) {
                alert("用户名和密码至少三个字符")
                return;
            }
            var zg = /^[a-zA-Z0-9]+$/;
            if (!zg.test(username) || !zg.test(password)) {
                alert("用户名和密码只能由字母和数字组成")
                return;
            }
            const response = await sign({ username, password });
            if(response === true) {
                alert("登录成功 ！")
                onLoginSuccess(username);
                await modal.hide();
            }else if(response === 2) {
                alert("注册成功 ！")
                onLoginSuccess(username);
                await modal.hide();
            }else {
                alert("用户名已存在或密码错误")
            }
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
                    用户名: <input id="username"
                                   type="text"
                                   defaultValue={name}
                                   onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    密码: <input id="password"
                                 type="password"
                                 onChange={(e) => setPassword(e.target.value)}/>
                </div>
                首次登录自动注册
            </div>
        </Modal>
    )
        ;
});

Sign.propTypes = {};

export default Sign;
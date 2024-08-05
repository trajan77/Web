import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";
import {sign} from "../../request/util.request.jsx";
import {useState} from "react";

const Sign = NiceModal.create(({ onLoginSuccess }) => {
    const modal = useModal();
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onOk = async () => {
        try {
            let flg = 1;
            if(username.length < 3) {
                setStatus("shortName");
                flg = 0;
            }
            if(password.length < 3) {
                setStatus("shortPassword");
                flg = 0;
            }
            var zg = /^[a-zA-Z0-9]+$/;
            if (!zg.test(username) || !zg.test(password)) {
                setStatus("everything");
                flg = 0;
            }
            if(username === "" || password === "") {
                setStatus("nothing");
                flg = 0;
            }
            if(flg === 1){
                const response = await sign({ username, password });
                if(response) {
                    onLoginSuccess(username);
                    await modal.hide();
                }else {
                    setStatus("wrong");
                }
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
                <Tipping
                    status = {status}
                />
            </div>
        </Modal>
    )
        ;
});

function Tipping(status) {
    if (status.status === "wrong" ) {
        return <div>用户名已存在或密码错误</div>;
    }else if (status.status === "nothing") {
        return <div>用户名和密码不能为空</div>;
    }else if (status.status === "shortName" || status.status === "shortPassword") {
        return <div>用户名和密码至少三个字符</div>;
    }else if (status.status === "everything" ) {
        return <div>用户名和密码只能由字母和数字组成</div>;
    }
    else{
        return <div>首次登录自动注册</div>;
    }
}

Sign.propTypes = {};

export default Sign;
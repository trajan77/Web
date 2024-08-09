import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, Button, Input } from 'antd';
import "./project.css";
import { useEffect, useState } from 'react';
import {getComments, sendComment, taskNext, taskPrev} from "../../request/util.request.jsx";

const Task = NiceModal.create(({ task, userName }) => {
    const modal = useModal();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);


    const onOk = async () => {
        if(comment){
            await sendComment({ comment, taskID: task.task_id, userName });
            setComment('');
            await modal.hide();
        }
    };

    const handleNextStage = async () => {
        await taskNext({ taskID: task.task_id });
        await modal.hide();
    };

    const handlePreviousStage = async () => {
        await taskPrev({ taskID: task.task_id });
        await modal.hide();
    };

    const handleEnd = async () => {
        await taskNext({ taskID: task.task_id });
        await modal.hide();
    };

    const handleUpload = async () => {
        alert("暂时未完成");
    };

    const handleDownload = async () => {
        alert("暂时未完成")
    };

    useEffect(() => {
        const fetchComments = async () => {
            const taskComments = await getComments(task.task_id);
            setComments(taskComments);
        };
        fetchComments();
    }, [task.task_id]);

    return (
        <Modal
            open={modal.visible}
            onOk={onOk}
            onCancel={modal.hide}
            afterClose={modal.remove}
            footer={[
                <Button key="close" onClick={modal.hide}>
                    关闭
                </Button>,

                (task.statues === 1 || task.statues === 2) && (
                    <Button key="prev" type="primary" onClick={handlePreviousStage}>
                        返回上一阶段
                    </Button>
                ),
                task.statues === 2 ? (
                    <Button key="end" type="primary" onClick={handleEnd}>
                        结束该任务
                    </Button>
                ) : (
                    <Button key="next" type="primary" onClick={handleNextStage}>
                        进入下一阶段
                    </Button>
                ),
            ]}
        >
            <div>
                <h3>{task.task_name}</h3>

                <h3>任务详情</h3>
                <p>{task.task_data}</p>

                <h3>截止日期</h3>
                <p>{task.due_date}</p>

                <h3>评论</h3>
                <div className="comments">
                    <ul>
                        {comments.map((comment, index) => (
                            <li className="comments" key={`comment-${index}`}>
                                {comment.user_name}: {comment.comment_text}
                            </li>
                        ))}
                    </ul>
                </div>

                <h3>发表评论</h3>
                <Input.TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                />
                <Button key="submit" type="primary" onClick={onOk}>
                    发表评论
                </Button>,
                <h3>附件列表</h3>
                <input type="file"/>
                <button onClick={handleUpload}>上传附件</button>
                <button onClick={handleDownload}>下载附件</button>
            </div>
        </Modal>
    );
});

export default Task;
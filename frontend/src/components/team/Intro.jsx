import "./Team.css";
import NiceModal from "@ebay/nice-modal-react";

const Intro = (userTeam, onShowCreateModal) => {
    return (
        <NiceModal.Provider>
            <div>
                {userTeam.userTeam.userTeam.userTeam === 0 ? (
                    <div className="intro">
                        <button onClick={()=>onShowCreateModal()}>
                            创建团队
                        </button>
                    </div>
                ) : (
                    <div className="intro">
                        <h3>团队名</h3>
                        <div className="itd">团队介绍</div>
                    </div>
                )}
            </div>
        </NiceModal.Provider>
    );
};


export default Intro;
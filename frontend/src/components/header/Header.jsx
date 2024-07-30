import "./header.css"
import NiceModal from "@ebay/nice-modal-react";
import Sign from "./Sign.jsx";

const Header = () => {

  return (
      <>
        <header>
          <div className="head">
            <div className="logo">
              <img src='../../../public/name.png' alt='' />
            </div>
            <ul className="navList">
              <li><a href="/team">团队</a></li>
              <li><a href="/project">项目</a></li>
            </ul>
            <div className='button flex'>
              <button className='btn1'  onClick={() => NiceModal.show(Sign)}>
                <i className='fa fa-sign-out'></i> 请先登录
              </button>
            </div>
          </div>
        </header>
      </>
  )
}

export default Header

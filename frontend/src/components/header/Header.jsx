import "./header.css"
import name from "/name.png"

// eslint-disable-next-line react/prop-types
const Header = ({ loggedInUser, onShowLoginModal, onLogout }) => {

  return (
      <>
        <header>
          <div className="head">
            <div className="logo">
              <img src={name} alt='' />
            </div>
            <ul className="navList">
              <li><a href="/team">团队</a></li>
              <li><a href="/project">项目</a></li>
            </ul>
            <div className='button flex'>
              {loggedInUser ? (
                  <div>
                    <span className="name">{loggedInUser}  </span>
                    <button onClick={onLogout}>
                      退出登录
                      </button>
                  </div>
              ) : (
                  <button onClick={() => onShowLoginModal()}>
                    请先登录
                  </button>
              )}
            </div>
          </div>
        </header>
      </>
  )
}

export default Header

import "./header.css"

const Header = () => {

  return (
      <>
        <header>
          <div className="head">
            <div className="logo">
              <img src='../../../public/name.png' alt='' />
            </div>
            <ul className="navList">
              <li><a href="">团队</a></li>
              <li><a href="">个人</a></li>
            </ul>
            <div className='button flex'>
              <button className='btn1'>
                <i className='fa fa-sign-out'></i> 请先登录
              </button>
            </div>
          </div>
        </header>
      </>
  )
}

export default Header

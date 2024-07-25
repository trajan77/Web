import { useState } from "react"
import "./header.css"

const Header = () => {
  const [navList, setNavList] = useState(false)

  return (
      <>
        <header>
          <div className="head">
            <div className="logo">
              <img src='../../../public/logo.png' alt='' />
            </div>
            <ul className="navList">
              <li><a href="">主页</a></li>
              <li><a href="">项目</a></li>
              <li><a href="">团队</a></li>
              <li><a href="">个人</a></li>
            </ul>
            <div className='button flex'>
              <h4>
                Name
              </h4>
              <button className='btn1'>
                <i className='fa fa-sign-out'></i> Sign In
              </button>
            </div>
            <div className='toggle'>
              <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
            </div>
          </div>
        </header>
      </>
  )
}

export default Header

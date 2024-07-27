import Header from "../header/Header"
import Home from "../home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Pages = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                </Routes>
            </Router>
        </>

    )
}

export default Pages
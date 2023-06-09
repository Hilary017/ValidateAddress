import { Outlet } from "react-router-dom"
import Steps from "./Steps";

import "./Home.css";

const Home = () => {
    return <div className="container-all">
        <Steps />
        <Outlet />
    </div>
}

export default Home;
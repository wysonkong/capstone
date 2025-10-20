import Layout from "./Layout"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Widgets from "./pages/Widgets";
import Signup from "@/pages/Signup.tsx";
import Login from "@/pages/Login.tsx";
import {AuthProvider} from "@/components/AuthProvider.tsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path={"/About"} element={<About/>}/>
                        <Route path={"/Widgets"} element={<Widgets/>}/>
                        <Route path={"/Login"} element={<Login/>}/>
                        <Route path={"/Signup"} element={<Signup/>}/>
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
  )
}

export default App

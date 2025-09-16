import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/Signup"
import Login from "./components/Login";
// import Review from "./components/Review";
import CreateUser from "./components/CreateUser";
import Profile from "./components/Profile";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/create' element={<CreateUser/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* <Route path='/review' element={<Review/>}/> */}
          <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

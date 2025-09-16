// import { Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import type { MainState } from "../store";
// import { createuser } from "../services/Userservice";

// const Review = () => {
//     const userData = useSelector((data: MainState) => data.userData);

//     const onSubmit = async () => {
//         await createuser( userData.firstName, userData.lastName, userData.email, userData.password);
//     }

//     return(
//         <>
//         <section className="w-full h-full flex-col flex justify-center items-center gap-5">
//             <span className="text-2xl">Review Data Entered</span>
//             <span>FirstName: {userData.firstName}</span>
//             <span>LastName: {userData.lastName}</span>
//             <span>Email: {userData.email}</span>
//             <span>Password: {userData.password}</span>
//             <div>
//                 <Button type='submit' variant='outlined' onClick={onSubmit}>Create</Button>
//             </div>
//         </section>
//         </>
//     )
// };

// export default Review;
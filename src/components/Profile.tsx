import { useEffect, useState } from "react";
import { profileAPI, type User } from "../services/Userservice";
import { Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearAuth } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await profileAPI();
        setUser(data.user);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  if (loading) return <div className="flex justify-center items-center h-full"><CircularProgress/></div>;
  if (err) return <div className="text-red-600">{err}</div>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-[420px]">
        <CardContent>
          <Typography variant="h6">Welcome</Typography>
          <Typography>First name: {user?.firstName}</Typography>
          <Typography>Last name: {user?.lastName}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <div className="mt-4">
            <Button onClick={logout} variant="outlined">Logout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

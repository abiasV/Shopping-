// import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useAuth } from "../providers/AuthProvider";

const Profile = () => {
  //   const { id } = useParams();
  const currentUser = useAuth();
  return (
    <Layout>
      <div>Welcome Back {currentUser.user}</div>
    </Layout>
  );
};

export default Profile;

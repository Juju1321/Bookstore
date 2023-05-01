import { useSelector } from "react-redux";
import { UserSelector } from "src/redux/reducers/userSlice";

export const useAuth = () => {
  const { name, email, token, id } = useSelector(UserSelector.getUser);

  return {
    isAuth: !!email,
    name,
    email,
    token,
    id,
  };
};

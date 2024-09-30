import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LayoutPublic() {
  const redirectPage = useNavigate();
  const [isTocken, setIsTocken] = useState(false);
  const cookies = new Cookies();

  

  const token = cookies.get("x-access-user");

  useEffect(() => {
    if (token) {
      redirectPage("/App");
      setIsTocken(true);
    }
  }, []);
  return (
    <Outlet />
  );
}

export default LayoutPublic;

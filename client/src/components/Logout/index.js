import { useHistory } from "react-router-dom";

function Logout(props) {
  let history = useHistory();

  function logoutThenNavigate() {
    props.handleLogout();
    history.push("/");
  }

  return (
    <>{logoutThenNavigate()}</>
  );
}

export default Logout;
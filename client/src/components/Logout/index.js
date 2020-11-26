import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";

function Logout(props) {
  let history = useHistory();

  useEffect(function() {
    props.handleLogout();
    history.push("/");
  }, [props, history]);

  return (
    <></>
  );
}

export default Logout;
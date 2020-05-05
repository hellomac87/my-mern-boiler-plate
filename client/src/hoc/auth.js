import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "store/user/ducks";
import { useHistory, Redirect } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  // option
  // null => 아무나 출입 가능
  // true => 로그인한 유저만 출입 가능
  // false => 로그인한 유저는 출입 불가능한 페이지
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
      dispatch(authUser(true));
      //To know my current status, send Auth request
      axios.get("/api/users/auth").then((response) => {
        //Not Loggined in Status
        if (!response.data.isAuth) {
          if (option) {
            history.push("/login");
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.data.isAdmin) {
            history.push("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              history.push("/");
            }
          }
        }
      });
    }, [dispatch]);

    return <SpecificComponent {...props} />;
  }
  return AuthenticationCheck;
}

import { useHistory } from "react-router-dom";
import instance from "../../api/instance";
export const SET_USER = "admin/SET_USER";

export const FetchUserAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/users",
      method: "GET",
    });
    dispatch({
      type: SET_USER,
      payload: res.data.content,
    });
    console.log(res.data.content);

    return res.data.content;
  } catch (err) {
    console.log( "errr",err);
  }
};

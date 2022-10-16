import { useHistory } from "react-router-dom";
import instance from "../../api/instance";
export const SET_PROFILE = "auth/SET_PROFILE";

// export const FetchProfileAction = async (dispatch) => {
//   const history = useHistory();
//   // if (!localStorage.getItem("token")) {
//   //   return;
//   // }
//   try {
//     const res = await instance.request({
//       url: "/api/users/{id}",
//       method: "GET",
      
//     });
//     localStorage.setItem("profile");
//     // dispatch({
//     //   type: SET_PROFILE,
//     //   payload: res.data.content,
//     // });
//   } catch (err) {
//     console.log(err);
//   }
// };
 
export const FetchProfileAction = async (dispatch) => {
  const history = useHistory();

  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
    });
    localStorage.setItem("profile");
    dispatch({
      type: SET_PROFILE,
      payload: res.data.content,
    });
    history.goBack();
  } catch (err) {
    console.log(err);
  }
};
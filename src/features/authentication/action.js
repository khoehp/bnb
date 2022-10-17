
import instance from "../../api/instance";
export const SET_PROFILE = "auth/SET_PROFILES";
export const fetchProfileAction = async (dispatch) => {
  if (!localStorage.getItem("token")) {
    return;
  }
  try {
    const res = await instance.request({
      url: `/api/users/${+localStorage.getItem("id")}`,
      method: "GET",
    });
    console.log(res.data.content);
    dispatch({
      type: SET_PROFILE,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const FetchProfileAction = async (dispatch) => {
//   if(!localStorage.getItem("token")){
//     return;
// }
//   try {
//     const res = await instance.request({
//       url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
//       method: "POST",
//     });
//     localStorage.setItem("profile");
//     dispatch({
//       type: SET_PROFILE,
//       payload: res.data.content,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
import { getAccessTokenLocal } from "../components/helper/tokenHelp";
import { updateToken } from "./tokenApi";
const host = "http://127.0.0.1:8090";

export const changeUser = async (
  name = "",
  surname = "",
  city = "",
  phone = ""
) => {
  const access = getAccessTokenLocal();
  console.log(access);
  return fetch(`${host}/user`, {
    method: "PATCH",
    body: JSON.stringify({
        name: name,
        surname: surname,
        city: city,
        phone: phone,
      }),
    headers: {
        "content-type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 401) {
      updateToken();
      return changeUser();
    }
    if (response.status === 422) {
        throw new Error("Validation Error");
      }
    throw new Error("Неизвестная ошибка, попробуйте позже");
  });
};

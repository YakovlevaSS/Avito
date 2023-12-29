import { getAccessTokenLocal} from "../components/helper/tokenHelp";
import { updateToken } from "./tokenApi";
const host = "http://127.0.0.1:8090";

export async function singUpApi(email, password, name, role, surname, city) {
  const response = await fetch(`${host}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      role: role,
      city: city,
      surname: surname,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Такой пользователь уже существует");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const data = await response.json();
  return data;
}

export async function singInApi(email, password) {
  const response = await fetch(`${host}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 401 || response.status === 422) {
    throw new Error("Пользователь не авторизован");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const data = response.json();
  return data;
}

export const getUser = async () => {
    const access = getAccessTokenLocal()
    return fetch(`${host}/user`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${access}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        updateToken();
        return getUser();
      }
    console.log('ok')
      throw new Error("Неизвестная ошибка, попробуйте позже");
    });
  };

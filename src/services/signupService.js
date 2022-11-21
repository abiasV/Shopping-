import http from "./httpService";

const signupUser = (data) => {
    return http.post("/user/register", data)
}

export default signupUser;
import axios from "axios";
import { navigate } from "@/app/actions";
import { getSession, updateTokens } from "@/libs/session";
import camelcaseKeys from "camelcase-keys";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL;

export const axiosInstanceWithToken = axios.create({
  baseURL
});
export const axiosInstanceWithoutToken = axios.create({
  baseURL
});

axiosInstanceWithToken.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    // اگر توکن موجود نیست یا منقضی شده بود
    if (!session || !session.token.accessToken) {
      // کاربر رو به صفحه ورود هدایت می‌کنیم
      window.location.href = "/signin";
      return Promise.reject("Token expired");
    }

    // اضافه کردن توکن به هدر درخواست
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${session.token.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceWithToken.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const session = await getSession();
      console.log({ session });
      console.log("Sending Requst");
      await axiosInstanceWithoutToken
        .post(`/auth/token/refresh/`, {
          refresh: session?.token.refreshToken
        })
        .then(async (res) => {
          const newAccessToken = res.data.result.access_token;

          await updateTokens({
            accessToken: newAccessToken,
            refreshToken: session?.token.refreshToken || ""
          });
          console.log({ newAccessToken });
          const getUserInfo =
            await axiosInstanceWithToken.get(`/accounts/info/`);

          console.log({ getUserInfo });

          prevRequest.headers["Authorization"] =
            `Bearer ${session?.token.accessToken}`;

          return axiosInstanceWithToken(prevRequest);
        })
        .catch(async (err) => {
          if (err.status == 422) {
            console.log({ AuthError: err });
            await navigate("/signin");
          }
        });
    }

    return Promise.reject(error);
  }
);

axiosInstanceWithoutToken.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceWithoutToken.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetcherWithToken = (url: string) =>
  axiosInstanceWithToken.get(url).then((res) => res.data);
const fetcherWithoutToken = (url: string) =>
  axiosInstanceWithoutToken.get(url).then((res) => res.data);

export { fetcherWithToken, fetcherWithoutToken };

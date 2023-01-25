import { Constants } from "../Constants";
import { decodeJwt } from "jose";
import AuthApi from "../../graphql/AuthApi";
import moment from "moment/moment";

class SessionHelper {
  handleSessionTokens({ accessToken, refreshToken }) {
    const { exp } = decodeJwt(accessToken) || {};
    localStorage.setItem(Constants.SESSION_EXPIRY_TIME_KEY, exp);
    localStorage.setItem(
      Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY,
      accessToken
    );
    localStorage.setItem(
      Constants.SESSION_STORAGE_REFRESH_TOKEN_KEY,
      refreshToken
    );
  }

  isSessionExpiring() {
    const sessionExpiryTime =
      parseInt(localStorage.getItem(Constants.SESSION_EXPIRY_TIME_KEY)) || 0;
    const currentTime = Math.round(moment(Date.now()).valueOf() / 1000);
    console.log("---------> sessionExpiryTime", {
      sessionExpiryTime,
      currentTime,
    });

    // Will session expire in next 60 seconds?
    return currentTime + 60 > sessionExpiryTime;
  }

  async checkAndUpdateTokens() {
    const refreshToken = localStorage.getItem(
      Constants.SESSION_STORAGE_REFRESH_TOKEN_KEY
    );

    if (!refreshToken) {
      return;
    }

    if (this.isSessionExpiring()) {
      // Session expiring soon. Refresh the token.
      console.log("Session expiring soon");

      try {
        const { accessToken, refreshToken: newRefreshToken } = (
          await AuthApi.refresh({ refreshToken: refreshToken })
        ).data.refresh;
        this.handleSessionTokens({
          accessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  clearSession() {
    const onBoarding = localStorage.getItem("onBoardingKey");
    localStorage.clear();
    localStorage.setItem("onBoardingKey", onBoarding);
  }
}

export default new SessionHelper();

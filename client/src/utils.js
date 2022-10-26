export const deleteCookies = () => {
  //   const cookies = document.cookie;

  //   for (let i = 0; i < cookies.split(";").length; i++) {
  //     const myCookie = cookies[i];
  //     const pos = myCookie.indexOf("=");
  //     const name = pos > -1 ? myCookie.substring(0, pos) : myCookie;
  //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //   }

  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

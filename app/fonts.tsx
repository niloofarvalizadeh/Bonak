import localFont from "next/font/local";

export const YekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/yekanBakhBold.woff",
      style: "normal",
      weight: "bold"
    },
    {
      path: "../../public/fonts/yekanBakhRegular.woff",
      style: "normal",
      weight: "normal"
    }
  ]
});

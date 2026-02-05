import { YekanBakh } from "@/app/fonts";
import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  direction: "rtl",
  styles: {
    global: {
      body: {
        fontFamily: YekanBakh.style.fontFamily
      }
    }
  },
  colors: {
    brand: {
      orange: {
        light: "#fff2e6",
        lightHover: "#ffebd9",
        lightActive: "#ffd6b0",
        normal: "#ff7b00",
        normalHover: "#e66f00",
        normalActive: "#cc6200",
        dark: "#bf5c00",
        darkHover: "#994a00",
        darkActive: "#733700",
        darker: "#592b00"
      },
      yellow: {
        light: "#fffbe6",
        lightHover: "#fff9d9",
        lightActive: "#fff2b0",
        normal: "#ffd400",
        normalHover: "#e6bf00",
        normalActive: "#ccaa00",
        dark: "#bf9f00",
        darkHover: "#997f00",
        darkActive: "#735f00",
        darker: "#594a00"
      },
      white: {
        light: "#ffffff",
        lightHover: "#ffffff",
        lightActive: "#ffffff",
        normal: "#ffffff",
        normalHover: "#e6e6e6",
        normalActive: "#cccccc",
        dark: "#bfbfbf",
        darkHover: "#999999",
        darkActive: "#737373",
        darker: "#595959"
      },
      blue: {
        light: "#b2bbc6",
        lightHover: "#a3adbb",
        lightActive: "#909dad",
        normal: "#546881",
        normalHover: "#47586e",
        normalActive: "#3d4c5e",
        dark: "#1d242d",
        darkHover: "#151a20",
        darkActive: "#090b0e"
      },
      wallet: {
        charge: "#1AD723",
        withdraw: "#F00"
      },
      logOut: "#ED433E",
      check: "#18D155"
    }
  }
});

export default chakraTheme;

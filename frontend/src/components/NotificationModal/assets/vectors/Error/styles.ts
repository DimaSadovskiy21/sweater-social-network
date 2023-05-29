import styled from "styled-components";

export const Image = styled("div")({
  width: "150px",
  height: "180px",
  backgroundColor: "var(--white)",
  backgroundRepeat: "no-repeat",
  backgroundImage: `linear-gradient(#ddd 50%, #bbb 51%),
    linear-gradient(#ddd, #ddd), linear-gradient(#ddd, #ddd),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%)`,
  backgroundPosition: "0 20px, 45px 0, 8px 6px, 55px 3px, 75px 3px, 95px 3px",
  backgroundSize:
    "100% 4px, 1px 23px, 30px 8px, 15px 15px, 15px 15px, 15px 15px",
  position: "relative",
  borderRadius: "6%",
  animation: "shake 3s ease-in-out infinite",
  transformOrigin: "60px 180px",
  ":before": {
    content: "''",
    position: "absolute",
    left: "5px",
    top: "100%",
    width: "7px",
    height: "5px",
    background: "#aaa",
    borderRadius: "0 0 4px 4px",
    boxShadow: "132px 0 #aaa",
  },
  ":after": {
    content: "''",
    position: "absolute",
    width: "125px",
    height: "125px",
    left: 0,
    right: 0,
    margin: "auto",
    bottom: "20px",
    backgroundColor: "#bbdefb",
    backgroundImage: `linear-gradient( to right, #0004 0%, #0004 49%, #0000 50%, #0000 100% ),
    linear-gradient(135deg, #64b5f6 50%, #607d8b 51%)`,
    backgroundSize: "30px 100%, 120px 110px",
    borderRadius: "50%",
    backgroundRepeat: "repeat, no-repeat",
    backgroundPosition: "0 0",
    boxSizing: "border-box",
    border: "10px solid var(--ligth-gray)",
    boxShadow: "0 0 0 4px #999 inset, 0 0 6px 6px #0004 inset",
    animation: "spin 3s ease-in-out infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },

    "50%": {
      transform: "rotate(360deg)",
    },

    "75%": {
      transform: "rotate(750deg)",
    },

    "100%": {
      transform: "rotate(1800deg)",
    },
  },
  "@keyframes shake": {
    "65%, 80%, 88%, 96%": {
      transform: "rotate(0.5deg)",
    },

    "50%, 75%, 84%, 92%": {
      transform: "rotate(-0.5deg)",
    },

    "0%, 50%, 100%": {
      transform: "rotate(0)",
    },
  },
});

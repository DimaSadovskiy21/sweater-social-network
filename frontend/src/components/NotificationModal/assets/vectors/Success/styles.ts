import styled from "styled-components";

export const Image = styled("div")({
  position: "relative",
  borderStyle: "solid",
  boxSizing: "border-box",
  borderWidth: "60px 90px 50px 90px",
  borderColor: "#3760C9 #96DDFC #96DDFC #36BBF7",
  animation: "envFloating 1s ease-in infinite alternate",
  ":after": {
    content: "''",
    position: "absolute",
    right: "62px",
    top: "-40px",
    height: "70px",
    width: "50px",
    backgroundImage: `linear-gradient(#fff 45px, transparent 0),
            linear-gradient(#fff 45px, transparent 0),
            linear-gradient(#fff 45px, transparent 0)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "30px 4px",
    backgroundPosition: "0px 11px , 8px 35px, 0px 60px",
    animation: "envDropping 0.75s linear infinite",
  },

  "@keyframes envFloating": {
    "0%": {
      transform: "translate(-2px, -5px)",
    },

    "100%": {
      transform: "translate(0, 5px)",
    },
  },

  "@keyframes envDropping": {
    "0%": {
      backgroundPosition: "100px 11px , 115px 35px, 105px 60px",
      opacity: 1,
    },

    "50%": {
      backgroundPosition: "0px 11px , 20px 35px, 5px 60px",
    },

    "60%": {
      backgroundPosition: "-30px 11px , 0px 35px, -10px 60px",
    },

    "75%, 100%": {
      backgroundPosition: "-30px 11px , -30px 35px, -30px 60px",
      opacity: 0,
    },
  },
});

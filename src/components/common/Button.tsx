import * as React from "react"
import { IonButton } from "@ionic/react"
import styled from "styled-components"
import cssVariables from "../../theme/componentCssProperties"

const IONIC_CSS_PROPERTIES = {}

export const Button = styled(IonButton)`
  letter-spacing: -1px;
  padding: 0 32px;
  height: 44px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  border-radius: 50px;
  border: 1px solid var(--colorBrandBlue);

  --color: #fff;
  --background: transparent;
  --background-activated: transparent;
  --background-activated-opacity: 0;
  --background-focused: transparent;
  --background-focused-opacity: 0;
  --background-hover: transparent;
  --background-hover-opacity: 0;

  box-shadow: 0px 4px 8px rgba(25, 241, 241, 0.25),
    0px 12px 32px rgba(1, 18, 6, 0.04), 0px -4px 7px rgba(112, 252, 151, 0.2);

  background-image: linear-gradient(
      175.49deg,
      rgba(103, 98, 98, 0.15) 19.95%,
      rgba(255, 255, 255, 0) 84.66%
    ),
    radial-gradient(
      100.55% 2146.95% at -0.37% 0.03%,
      #14311c 0%,
      #011206 23.28%,
      #031f17 85.05%,
      #073535 100%
    ),
    linear-gradient(#011206, #011206);
  /*
--border-color
--border-radius
--border-style
--border-width
--box-shadow
--color
--letter-spacing
--color-activated
--color-focused
--color-hover
--opacity
--padding-bottom
--padding-end
--padding-start
--padding-top
--ripple-color
--transition
*/
`

Button.defaultProps = {
  expand: "full"
}

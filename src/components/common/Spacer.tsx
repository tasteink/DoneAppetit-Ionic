import styled from "styled-components"

export const Spacer = styled.div`
  display: inline-flex;
  width: ${(props) => props.width || props.size};
  height: ${(props) => props.height || props.width || props.size};
`

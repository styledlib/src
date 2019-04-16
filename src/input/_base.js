import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import posed from "react-pose";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { REQUIRED_SIZE } from "./_required";
import { TOOLTIP_SIZE } from "./_tooltip";

import Box from "../box";
import Flex from "../flex";
import Icon, { iconLibrary } from "../icon";
import { InlineText } from "../typography";

export const determineInputRightPadding = (required, tooltip, spacer) => {
  let additionalPadding = 0;

  if (required) {
    additionalPadding += REQUIRED_SIZE + spacer;
  }

  if (tooltip) {
    additionalPadding += TOOLTIP_SIZE + spacer;
  }

  return spacer + additionalPadding;
};

const determineBorderRadius = props =>
  props.hasMessages
    ? `${themeGet("radii.normal")(props)}px ${themeGet("radii.normal")(
        props
      )}px 0px 0px`
    : themeGet("radii.normal")(props);

const determineBorders = props => ({
  transition: `border ${themeGet("animations.fast")(props)} ease-in-out`,
  borderRadius: determineBorderRadius(props),
  border: `1px solid ${themeGet("colors.snow")(props)}`,
  "&:focus": {
    border: `1px solid ${themeGet("colors.primary")(props)}`
  }
});

export const Input = styled(Box)(props => ({
  padding: themeGet("space.3")(props),
  paddingRight: determineInputRightPadding(
    props.required,
    props.tooltip,
    themeGet("space.3")(props)
  ),
  width: "100%",
  ...determineBorders(props)
}));

Input.defaultProps = {
  ...Box.defaultProps,
  as: "input",
  backgroundColor: "trueWhite"
};

Input.displayName = "Input";

const CheckboxContainer = styled(Flex)({
  cursor: "pointer",
  alignItems: "center"
});

const CheckboxElem = styled(Box)(props => ({
  width: themeGet("widths.2")(props),
  height: themeGet("heights.2")(props),
  ...determineBorders(props)
}));

const PosedCheck = posed(Icon)({
  checked: {
    scale: 1,
    opacity: 1
  },
  unchecked: {
    scale: 0.5,
    opacity: 0
  }
});

const CheckboxLabel = styled(InlineText)(props => ({
  fontWeight: themeGet("fontWeights.bold")(props),
  marginLeft: themeGet("space.3")(props),
  userSelect: "none"
}));

export const Checkbox = props => {
  const [checked, setChecked] = useState(false);

  iconLibrary.add(faCheck);

  return (
    <CheckboxContainer onClick={() => setChecked(!checked)}>
      <CheckboxElem>
        <PosedCheck
          pose={checked ? "checked" : "unchecked"}
          icon="check"
          size={0}
          m={2}
          color="success"
        />
      </CheckboxElem>
      <CheckboxLabel>{props.label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export const Textarea = styled(Input)({
  resize: "none",
  paddingTop: "10px",
  minHeight: "90px"
});

Textarea.defaultProps = {
  ...Box.defaultProps,
  ...Input.defaultProps,
  as: "textarea",
  lineHeight: "title"
};

Textarea.displayName = "Textarea";

export const InputContainer = styled(Box)({
  position: "relative"
});

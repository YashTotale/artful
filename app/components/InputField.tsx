// React Imports
import { FC } from "react";
import { Control, FieldValues, useController } from "react-hook-form";

// Style Imports
import { capitalize, TextField } from "@mui/material";

interface InputFieldProps {
  name: string;
  control: Control<any>;
  type?: string;
  defaultValue?: string;
  startAdornment?: JSX.Element;
  required?: boolean;
  label?: string;
}

const InputField: FC<InputFieldProps> = (props) => {
  const {
    field: { ref, ...priceProps },
    formState,
  } = useController({
    name: props.name,
    control: props.control,
    rules: { required: props.required ?? "This field is required" },
    defaultValue: props.defaultValue ?? "",
  });

  const error = formState.errors[props.name];
  const label =
    props.label ??
    `${capitalize(props.name)}${props.required !== false ? "*" : ""}`;

  return (
    <TextField
      {...priceProps}
      inputRef={ref}
      label={label}
      variant="outlined"
      type={props.type ?? "text"}
      error={!!error}
      helperText={error?.message?.toString()}
      fullWidth
      autoComplete="off"
      sx={{
        fontSize: "100%",
        marginBottom: "16px",
      }}
      InputLabelProps={{
        sx: {
          fontSize: "100%",
        },
      }}
      InputProps={{
        sx: {
          fontSize: "100%",
        },
        startAdornment: props.startAdornment,
      }}
    />
  );
};

export default InputField;

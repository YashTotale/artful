// React Imports
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "./InputField";

// Style Imports
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { colorPrimary } from "../styles/colors";
import { btn, btnAccent } from "../styles/button";
import { textMedium, textSmall } from "../styles/text";

interface Inputs {
  email: string;
  password: string;
}

interface LoginProps {
  open: boolean;
  closeLogin: () => void;
}

const Login: FC<LoginProps> = (props) => {
  const { control, handleSubmit } = useForm<Inputs>({
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<Inputs> = (inputs) => {};

  return (
    <Dialog
      open={props.open}
      onClose={props.closeLogin}
      PaperProps={{
        sx: {
          backgroundColor: colorPrimary,
        },
      }}
    >
      <DialogTitle variant="h2" textAlign="center">
        Log In
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} css={{ paddingTop: "6px" }}>
          <InputField name="email" type="email" control={control} />
          <InputField name="password" type="password" control={control} />
          <div css={{ display: "flex", marginTop: "16px" }}>
            <button
              css={{
                ...btn,
                ...btnAccent,
                ...textSmall,
                ...textMedium,
                margin: "auto",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

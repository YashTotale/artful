// React Imports
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../components/InputField";

// Style Imports
import {
  FormHelperText,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { btn, btnAccent } from "../styles/button";
import { textMedium, textSmall } from "../styles/text";

type FileWithPreview = File & {
  preview: string;
};

interface Inputs {
  image: File | null;
  type: string;
  name: string;
  price: string;
  shares: string;
}

const NewArt: FC = () => {
  const { control, handleSubmit, watch, formState } = useForm<Inputs>();
  const [acceptedFile, setFile] = useState<FileWithPreview | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const accepted = acceptedFiles[0];
      setFile(
        Object.assign(accepted, {
          preview: URL.createObjectURL(accepted),
        })
      );
    },
  });

  const onUpload: SubmitHandler<Inputs> = async (inputs) => {
    if (!inputs.image) return;

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("image", inputs.image);
    formData.append("type", inputs.type);
    formData.append("shares", inputs.shares);

    const response = await fetch("/api/upload-art", {
      method: "POST",
      body: formData,
    });

    console.log(await response.json());
  };

  useEffect(() => {
    return () => {
      acceptedFile && URL.revokeObjectURL(acceptedFile.preview);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onUpload)}>
      <Controller
        control={control}
        name="image"
        defaultValue={null}
        rules={{
          required: "Image is required",
        }}
        render={({ field: { onChange } }) => {
          return (
            <div
              {...getRootProps({
                css: {
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  borderWidth: "2px",
                  borderRadius: "2px",
                  borderColor: "#eeeeee",
                  borderStyle: "dashed",
                  backgroundColor: "#fafafa",
                  color: "#bdbdbd",
                  cursor: "pointer",
                  outline: "none",
                  transition: "border .24s ease-in-out",
                },
              })}
            >
              <input
                {...getInputProps({
                  onChange: (e) => onChange(e.target?.files?.[0] ?? null),
                })}
              />
              <p>
                {isDragActive
                  ? "Drop here..."
                  : "Drag 'n' drop an image of your artwork here, or click to select an image"}
              </p>
            </div>
          );
        }}
      />
      <aside
        css={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          marginTop: 16,
        }}
      >
        <div css={{ display: "flex", flexDirection: "column" }}>
          <div
            css={{
              display: "inline-flex",
              borderRadius: 2,
              border: `1px solid ${
                !!formState.errors.image ? "red" : "#eaeaea"
              }`,
              marginBottom: 8,
              padding: 4,
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0,
                width: "100%",
                overflow: "hidden",
              }}
            >
              {acceptedFile ? (
                <img
                  src={acceptedFile.preview}
                  css={{
                    display: "block",
                    objectFit: "cover",
                    height: "300px",
                  }}
                  onLoad={() => {
                    URL.revokeObjectURL(acceptedFile.preview);
                  }}
                />
              ) : (
                <span
                  css={{
                    textAlign: "center",
                    width: "100%",
                    lineHeight: "300px",
                  }}
                >
                  No Image Uploaded
                </span>
              )}
            </div>
          </div>
          {!!formState.errors.image && (
            <FormHelperText error>
              {formState.errors.image.message}
            </FormHelperText>
          )}
        </div>
        <div css={{ marginLeft: "16px" }}>
          <Controller
            name="type"
            control={control}
            defaultValue="Commercial"
            render={({ field }) => (
              <ToggleButtonGroup
                sx={{
                  marginBottom: "16px",
                }}
                fullWidth
                exclusive
                {...field}
                onChange={(e, value: string) => {
                  field.onChange(value);
                }}
              >
                <ToggleButton
                  value="Commercial"
                  key="Commercial"
                  css={{ fontSize: "100%", textTransform: "none" }}
                >
                  Commercial
                </ToggleButton>
                <ToggleButton
                  value="Fundraiser"
                  key="Fundraiser"
                  css={{ fontSize: "100%", textTransform: "none" }}
                >
                  Fundraiser
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
          <InputField name="name" control={control} />
          <InputField
            name="price"
            control={control}
            startAdornment={
              <InputAdornment position="start">
                <span css={{ fontSize: "100%" }}>$</span>
              </InputAdornment>
            }
          />
          {watch("type") === "fundraiser" && (
            <InputField name="shares" control={control} defaultValue="100" />
          )}
        </div>
      </aside>
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
          Upload
        </button>
      </div>
    </form>
  );
};

export default NewArt;

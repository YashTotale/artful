// React Imports
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useController, useForm } from "react-hook-form";

// Style Imports
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import { btn, btnAccent } from "../styles/button";
import { textMedium, textSmall } from "../styles/text";

type FileWithPreview = File & {
  preview: string;
};

interface Inputs {
  file: File | null;
  name: string;
  price: string;
}

const NewArt: FC = () => {
  const { control, handleSubmit, formState } = useForm<Inputs>();
  const {
    field: { ref: nameRef, ...nameProps },
  } = useController({
    name: "name",
    control,
    rules: { required: "Name is required" },
    defaultValue: "",
  });
  const {
    field: { ref: priceRef, ...priceProps },
  } = useController({
    name: "price",
    control,
    rules: { required: "Price is required" },
    defaultValue: "",
  });

  const [acceptedFile, setFile] = useState<FileWithPreview | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
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

  const onSubmit = () => {};

  useEffect(() => {
    return () => {
      acceptedFile && URL.revokeObjectURL(acceptedFile.preview);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="file"
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
                Drag 'n' drop an image of your artwork here, or click to select
                an image
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
                !!formState.errors.file ? "red" : "#eaeaea"
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
                    height: "250px",
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
                    lineHeight: "250px",
                  }}
                >
                  No Image Uploaded
                </span>
              )}
            </div>
          </div>
          {!!formState.errors.file && (
            <FormHelperText error>
              {formState.errors.file.message}
            </FormHelperText>
          )}
        </div>
        <div css={{ marginLeft: "16px" }}>
          <TextField
            {...nameProps}
            inputRef={nameRef}
            label="Name"
            variant="outlined"
            fullWidth
            type="text"
            error={!!formState.errors.name}
            helperText={formState.errors.name?.message}
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
            }}
          />
          <TextField
            {...priceProps}
            inputRef={priceRef}
            label="Price"
            variant="outlined"
            type="text"
            error={!!formState.errors.price}
            helperText={formState.errors.price?.message}
            fullWidth
            sx={{
              fontSize: "100%",
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
              startAdornment: (
                <InputAdornment position="start">
                  <span css={{ fontSize: "100%" }}>$</span>
                </InputAdornment>
              ),
            }}
          />
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

// React Imports
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// Style Imports
import { InputAdornment, TextField } from "@mui/material";
import { btn, btnAccent } from "../styles/button";
import { textMedium, textSmall } from "../styles/text";

type FileWithPreview = File & {
  preview: string;
};

const NewArt: FC = () => {
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

  useEffect(() => {
    return () => {
      acceptedFile && URL.revokeObjectURL(acceptedFile.preview);
    };
  }, []);

  return (
    <section>
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
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop an image of your artwork here, or click to select an
          image
        </p>
      </div>
      <aside
        css={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          // gap: "16px",
          marginTop: 16,
        }}
      >
        <div
          css={{
            display: "inline-flex",
            borderRadius: 2,
            border: "1px solid #eaeaea",
            marginBottom: 8,
            padding: 4,
            boxSizing: "border-box",
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
        <div css={{ marginLeft: "16px" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
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
            label="Price"
            variant="outlined"
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
    </section>
  );
};

export default NewArt;

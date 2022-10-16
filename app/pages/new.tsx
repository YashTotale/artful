// React Imports
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileWithPreview = File & {
  preview: string;
};

const NewArt: FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div
        {...getRootProps({
          css: {
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          Drag 'n' drop some images of your artwork here, or click to select
          images
        </p>
      </div>
      <aside
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        {files.map((file) => (
          <div
            style={{
              display: "inline-flex",
              borderRadius: 2,
              border: "1px solid #eaeaea",
              marginBottom: 8,
              padding: 4,
              boxSizing: "border-box",
            }}
            key={file.name}
          >
            <div
              style={{
                display: "flex",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={file.preview}
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: "250px",
                }}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default NewArt;

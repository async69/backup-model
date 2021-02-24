import React from "react";
import { Button } from "reactstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MdPrint } from "react-icons/md";

const DefaultProps = {
  Print: () => <></>,
  fileName: "report",
  orientation: "landscape",
  mapper: (data) => data,
};

export const DownloadLink = ({
  Print,
  fileName,
  data,
  orientation,
  mapper,
} = DefaultProps) => {
  const dataMapper = mapper ? mapper : DefaultProps.mapper;
  return (
    <PDFDownloadLink
      document={
        <Print
          orientation={orientation ? orientation : DefaultProps.orientation}
          className="app"
          invoice={dataMapper(data)}
        />
      }
      fileName={`${fileName ? fileName : DefaultProps.fileName}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button className="ml-3" size="sm" outline color="primary">
            Loading ...
          </Button>
        ) : (
          <Button className="ml-3" size="sm" outline color="primary">
            <MdPrint />
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

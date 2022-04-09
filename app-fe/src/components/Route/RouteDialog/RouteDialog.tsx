import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./RouteDialog.css";

type routeDialogProp = {
  refresh: () => void;
  areaId: number;
};

const RouteDialog = ({ refresh, areaId }: routeDialogProp) => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<number | null>(null);

  const onDisplay = () => {
    setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
  };

  const onSave = () => {
    postData();
  };

  const postData = () => {
    const token = getToken();
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/climbing-routes/climbing-route`,
          {
            name: name,
            grade: grade,
            areaId: areaId,
          },
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          if (res.data === "Created") {
            // @ts-ignore: Object is possibly 'null'.
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Created",
            });
            setName("");
            setGrade(null);
            refresh();
            setDisplay(false);
          } else {
            showError("Error occured");
          }
        })
        .catch((error) => {
          showError("Error occured");
        });
    }
  };

  const isDisabled = () => {
    if (name === "" || grade === null || grade < 1 || grade > 27) return true;
    return false;
  };

  const toast = useRef(null);

  const showError = (message: string) => {
    // @ts-ignore: Object is possibly 'null'.
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: 3000,
    });
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => onSave()}
          autoFocus
          disabled={isDisabled()}
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        style={{ marginTop: "15px" }}
        label="New"
        onClick={() => onDisplay()}
      />

      <Dialog
        header="New Route"
        visible={display}
        style={{ width: "700px" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <div>
          <span className="headers">Route Name</span>
          <br />
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <span className="headers">Grade</span>
          <br />
          <InputNumber
            value={grade}
            onValueChange={(e) => setGrade(e.value)}
            mode="decimal"
            min={1}
            max={27}
          />
        </div>
      </Dialog>
    </>
  );
};

export default RouteDialog;

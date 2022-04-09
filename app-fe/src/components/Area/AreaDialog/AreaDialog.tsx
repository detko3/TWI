import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import "./AreaDialog.css";
import getToken from "../../../data/getToken";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Buffer } from "buffer";

type areaDialogProp = {
  refresh: () => void;
};

const AreaDialog = ({ refresh }: areaDialogProp) => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

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
          `${process.env.REACT_APP_SERVER_URL}/climbing-areas/climbing-area`,
          {
            name: name,
            latitude: latitude,
            longitude: longitude,
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
            setLatitude(null);
            setLongitude(null);
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
    if (
      name === "" ||
      latitude === null ||
      latitude < -90 ||
      latitude > 90 ||
      longitude === null ||
      longitude < -180 ||
      longitude > 180
    )
      return true;
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
        header="New Area"
        visible={display}
        style={{ width: "700px" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <div>
          <span className="headers">Area Name</span>
          <br />
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <span className="headers">Latitude</span>
          <br />
          <InputNumber
            value={latitude}
            onValueChange={(e) => setLatitude(e.value)}
            mode="decimal"
            minFractionDigits={2}
            maxFractionDigits={5}
          />
          <br />
          <br />
          <span className="headers">Longitude</span>
          <br />
          <InputNumber
            value={longitude}
            onValueChange={(e) => setLongitude(e.value)}
            mode="decimal"
            minFractionDigits={2}
            maxFractionDigits={5}
          />
        </div>
      </Dialog>
    </>
  );
};

export default AreaDialog;

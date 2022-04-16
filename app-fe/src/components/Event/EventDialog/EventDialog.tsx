import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./EventDialog.css";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

type eventsDialogProp = {
  refresh: () => void;
};

const EventDialog = ({ refresh }: eventsDialogProp) => {
  const [display, setDisplay] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [date, setDate] = useState<Date | Date[] | undefined>(undefined);
  const [minGrade, setMinGrade] = useState<number | null>(null);
  const [maxGrade, setMaxGrade] = useState<number | null>(null);
  const [participants, setParticipants] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const token = getToken();

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/climbing-areas`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          console.log("Areas: ", res.data);
          setAreas(res.data);
          // console.log(climbed);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onDisplay = () => {
    setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
  };

  const isDisabled = () => {
    if (
      selectedArea === null ||
      selectedArea === undefined ||
      date === null ||
      date === undefined ||
      undefined ||
      participants === null ||
      participants < 2
    ) {
      return true;
    }
    return false;
  };

  const onSave = () => {
    const time = date?.toString().slice(16, 24);
    // console.log(isPrivate);
    postEvent(time!);
  };

  const postEvent = (ftime: string) => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/climbing-event`,
          {
            area: selectedArea.id,
            minGrade: minGrade,
            maxGrade: maxGrade,
            maxParticipants: participants,
            date: date,
            time: ftime,
            isPrivate: isPrivate,
            description: description,
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
            setSelectedArea(null);
            setMinGrade(null);
            setMaxGrade(null);
            setParticipants(null);
            setDate(undefined);
            setIsPrivate(false);
            setDescription("");
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
        header="New Event"
        visible={display}
        style={{ width: "700px" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <span className="headers">Private</span>
        <Checkbox
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.checked)}
          style={{ marginLeft: "10px" }}
        />
        <br />
        <br />
        <span className="headers">Area</span>
        <br />
        <Dropdown
          optionLabel="name"
          value={selectedArea}
          options={areas}
          onChange={(e) => setSelectedArea(e.value)}
          placeholder=""
        />
        <br />
        <br />
        <span className="headers">Date and Time</span>
        <br />
        <Calendar
          dateFormat="yy-mm-dd"
          value={date}
          onChange={(e) => {
            setDate(e.value);
          }}
          showTime
          showSeconds
          showIcon
          readOnlyInput
        />
        <br />
        <br />
        <span className="headers">Max participants</span>
        <br />
        <InputNumber
          value={maxGrade}
          onValueChange={(e) => setParticipants(e.value)}
          mode="decimal"
          min={2}
        />
        <br />
        <br />
        <span className="headers">Min grade</span>
        <br />
        <InputNumber
          value={minGrade}
          onValueChange={(e) => setMinGrade(e.value)}
          mode="decimal"
          min={1}
          max={27}
        />
        <br />
        <br />
        <span className="headers">Max grade</span>
        <br />
        <InputNumber
          value={maxGrade}
          onValueChange={(e) => setMaxGrade(e.value)}
          mode="decimal"
          min={1}
          max={27}
        />
        <br />
        <br />
        <span className="headers">Description</span>
        <br />
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </Dialog>
    </>
  );
};

export default EventDialog;

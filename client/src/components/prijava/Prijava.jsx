import React from "react";
import "./prijava.scss";
import { useState } from "react";
import { useRef } from "react";
import { Upload } from "upload-js";
import { FaCheck } from "react-icons/fa";
import Modal from "./modal/Modal";
import { Loader } from "./../loader/Loader";

const AnimatedBar = ({ percent = 0 }) => {
  return (
    <div className="animatedbar-wrapper">
      <div className="animatedbar" style={{ width: percent }}></div>
    </div>
  );
};

const upload = Upload({ apiKey: "public_12a1xypc2U2yTkvuRJu32YfsNyJb" });
const FileUploadButton = (props) => {
  const [errorMax, setErrorMax] = useState(false);
  const [percent, setPercent] = useState(0); //ovde ""
  async function onFileSelected(event) {
    props.setFileValue(event.target.value);
    setErrorMax(false);
    try {
      const [file] = event.target.files;
      console.log(event.target.files);
      const { fileUrl } = await upload.uploadFile(file, {
        onBegin: ({ cancel }) => console.log("File upload started!"),
        onProgress: ({ progress }) => setPercent(progress), //ovde je bio progress.toString()
      });

      console.log(`File uploaded! ${fileUrl}`);
      console.log(file.name);
      props.onChange(fileUrl);
    } catch (e) {
      setErrorMax(true);
      setPercent(0); //ovde ""
      props.setFileValue("");
    }
  }
  return (
    <>
      <input
        id={props.id}
        className={`pr-text ${props.error && !props.prom ? "errorClass" : ""}`}
        type="file"
        onChange={(e) => onFileSelected(e)}
        required
      />
      {percent === 100 ? (
        <FaCheck style={{ color: "green" }}></FaCheck>
      ) : (
        percent !== 0 && <AnimatedBar percent={percent} />
      )}
      {/* <div style={{ color: "white", fontFamily: "Noto Sans" }}>{percent}</div> */}
      {((props.error && !props.prom) || errorMax) && (
        <label class="pr-lable-error">
          CV je obavezan i maksimalna veličina fajla je 5MB!
        </label>
      )}
    </>
  );
};

const Prijava = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [ime1, setIme1] = useState("");
  const [ime2, setIme2] = useState("");
  const [ime3, setIme3] = useState("");
  const [ime4, setIme4] = useState("");
  const [imejl1, setImejl1] = useState("");
  const [imejl2, setImejl2] = useState("");
  const [imejl3, setImejl3] = useState("");
  const [imejl4, setImejl4] = useState("");
  const [brojTelefona1, setbrojTelefon1] = useState("");
  const [brojTelefona2, setbrojTelefon2] = useState("");
  const [brojTelefona3, setbrojTelefon3] = useState("");
  const [brojTelefona4, setbrojTelefon4] = useState("");
  const [status1, setStatus1] = useState("zaposlen");
  const [status2, setStatus2] = useState("zaposlen");
  const [status3, setStatus3] = useState("zaposlen");
  const [status4, setStatus4] = useState("zaposlen");
  const [imeSkole1, setimeSkole1] = useState("");
  const [imeSkole2, setimeSkole2] = useState("");
  const [imeSkole3, setimeSkole3] = useState("");
  const [imeSkole4, setimeSkole4] = useState("");
  const [cv1, setCv1] = useState("");
  const [cv2, setCv2] = useState("");
  const [cv3, setCv3] = useState("");
  const [cv4, setCv4] = useState("");
  const [pitanje1, setPitanje1] = useState("");
  const [pitanje2, setPitanje2] = useState("");
  const [pitanje3, setPitanje3] = useState("");
  const [pitanje4, setPitanje4] = useState("");
  const [vesti, setVesti] = useState(false);
  const [pravila, setPravila] = useState(false);

  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);

  const formRef = useRef();

  const clearForm = () => {
    formRef.current.reset();
    setIme1("");
    setIme2("");
    setIme3("");
    setIme4("");
    setImejl1("");
    setImejl2("");
    setImejl3("");
    setImejl4("");
    setbrojTelefon1("");
    setbrojTelefon2("");
    setbrojTelefon3("");
    setbrojTelefon4("");
    setimeSkole1("");
    setimeSkole2("");
    setimeSkole3("");
    setimeSkole4("");
    setPitanje1("");
    setPitanje2("");
    setPitanje3("");
    setPitanje4("");
    setStatus1("zaposlen");
    setStatus2("zaposlen");
    setStatus3("zaposlen");
    setStatus4("zaposlen");
    setCv1("");
    setCv2("");
    setCv3("");
    setCv4("");
    setError1(false);
    setError(false);
    setPravila(false);
    setVesti(false);
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (poruka) => {
    setModalMessage(poruka);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalMessage("");
    setModalOpen(false);
  };

  const postPrijava = async (prijava) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/prijave/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prijava),
      });
      const data = await response.json();
      if (data.success) {
        openModal(
          "Uspešno poslata prijava!"
          // "Uspešno poslata prijava!\nPotvrda prijave je poslata na mejl svakome od članova."
        );
        clearForm();
      } else {
        openModal(data.msg);
      }
    } catch (e) {
      openModal(e.message);
    } finally {
      setLoading(false);
    }
  };

  const posaljiPrijavu = async () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    if (
      !ime1 ||
      !ime2 ||
      !ime3 ||
      !imejl1 ||
      !imejl2 ||
      !imejl3 ||
      !brojTelefona1 ||
      !brojTelefona2 ||
      !brojTelefona3 ||
      // !imeSkole1 ||
      // !imeSkole2 ||
      // !imeSkole3 ||
      !pitanje1 ||
      !pitanje2 ||
      !pitanje3 ||
      !pitanje4 ||
      !validateEmail(imejl1) ||
      !validateEmail(imejl2) ||
      !validateEmail(imejl3) ||
      cv1 === null ||
      !cv1 ||
      cv2 === null ||
      !cv2 ||
      cv3 === null ||
      !cv3 ||
      !pravila
    ) {
      setError(true);
      openModal("Neuspešna prijava!\nProverite crvena polja!");

      return;
    } else if (
      (status1 !== "zaposlen" && imeSkole1 === "") ||
      (status2 !== "zaposlen" && imeSkole2 === "") ||
      (status3 !== "zaposlen" && imeSkole3 === "")
    ) {
      setError(true);
      openModal("Neuspešna prijava!\nProverite crvena polja!");
      return;
    }

    if (ime4 || imeSkole4 || brojTelefona4 || validateEmail(imejl4) || cv4) {
      if (!(ime4 && brojTelefona4 && validateEmail(imejl4) && cv4)) {
        setError1(true);
        openModal("Neuspešna prijava!\nProverite crvena polja!");
        return;
      } else if (status4 !== "zaposlen" && imeSkole4 === "") {
        setError1(true);
        openModal("Neuspešna prijava!\nProverite crvena polja!");
        return;
      }
    }

    const prijava = {
      pitanje1,
      pitanje2,
      pitanje3,
      pitanje4,
      vesti,
      clanovi: [
        {
          imePrezime: ime1,
          email: imejl1,
          brojTelefona: brojTelefona1,
          status: status1,
          imeSkole: imeSkole1,
          linkCV: cv1,
        },
        {
          imePrezime: ime2,
          email: imejl2,
          brojTelefona: brojTelefona2,
          status: status2,
          imeSkole: imeSkole2,
          linkCV: cv2,
        },
        {
          imePrezime: ime3,
          email: imejl3,
          brojTelefona: brojTelefona3,
          status: status3,
          imeSkole: imeSkole3,
          linkCV: cv3,
        },
        // ...(someCondition && {b: 5})
        ...(ime4 && brojTelefona4 && validateEmail(imejl4) && cv4
          ? [
              {
                imePrezime: ime4,
                email: imejl4,
                brojTelefona: brojTelefona4,
                status: status4,
                imeSkole: imeSkole4,
                linkCV: cv4,
              },
            ]
          : [
              {
                imePrezime: "/",
                email: "/",
                brojTelefona: "/",
                status: "/",
                imeSkole: "/",
                linkCV: "/",
              },
            ]),
      ],
    };

    postPrijava(prijava);
  };

  return (
    <>
      {loading && <Loader />}

      <div class="pr-prijava">
        <div className="pr-ball-blur" />
        <div className="pr-blue-rectangle-blur" />
        <div className="pr-purple-rectangle-blur" />
        <div className="pr-blue-ball-blur2" />
        <div className="pr-purple-rectangle-blur2" />
        <div class="pr-header">
          <h1 class="pr-h1">Prijava</h1>
        </div>
        {modalOpen && (
          <Modal header="Status prijave:" closeModal={closeModal}>
            <p>{modalMessage}</p>
          </Modal>
        )}
        <form
          class="pr-team-data"
          id="pr-team-data"
          autoComplete="off"
          ref={formRef}
        >
          <div class="pr-content">
            <div class="pr-members">
              <div class="pr-member">
                <h1 class="pr-h1_m">Član 1</h1>
                <lable class="pr-lable" for="pr-name_m1">
                  Ime i prezime
                </lable>
                <input
                  type="text"
                  class={`pr-text ${error && ime1 === "" ? "errorClass" : ""}`}
                  id="pr-name_m1"
                  onChange={(e) => {
                    setIme1(e.target.value);
                  }}
                  required
                ></input>
                {error && ime1 === "" && (
                  <label class="pr-lable-error">Ime je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-email_m1">
                  Imejl
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && !validateEmail(imejl1) ? "errorClass" : ""
                  }`}
                  id="pr-email_m1"
                  onChange={(e) => {
                    setImejl1(e.target.value);
                  }}
                  required
                ></input>
                {error && !validateEmail(imejl1) && (
                  <label class="pr-lable-error">
                    Imejl je obavezan i mora biti u formatu
                    "myemail@gmail.domain"!
                  </label>
                )}
                <lable class="pr-lable" for="pr-phone_m1">
                  Broj telefona
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && brojTelefona1 === "" ? "errorClass" : ""
                  }`}
                  id="pr-phone_m1"
                  required
                  onChange={(e) => {
                    setbrojTelefon1(e.target.value);
                  }}
                ></input>
                {error && brojTelefona1 === "" && (
                  <label class="pr-lable-error">
                    Broj telefona je obavezan!
                  </label>
                )}
                <lable class="pr-lable" for="pr-select_m1">
                  Status: zaposlen, student, srednjoškolac
                </lable>
                <select
                  class="pr-select"
                  id="pr-select_m1"
                  onChange={(e) => {
                    setStatus1(e.target.value);
                  }}
                  required
                >
                  <option value="zaposlen">Zaposlen/a</option>
                  <option value="student">Student/kinja</option>
                  <option value="srednjoskolac">Srednjoškolac/ka</option>
                </select>
                <lable class="pr-lable" for="pr-year_m1">
                  Godina i naziv fakulteta/razred i naziv srednje škole
                </lable>
                <input
                  type="text"
                  id="pr-year_m1"
                  class={`pr-text ${
                    error && imeSkole1 === "" && status1 !== "zaposlen"
                      ? "errorClass"
                      : ""
                  }`}
                  onChange={(e) => {
                    setimeSkole1(e.target.value);
                  }}
                  required
                ></input>
                {error && imeSkole1 === "" && status1 !== "zaposlen" && (
                  <label class="pr-lable-error">
                    Godina i naziv fakulteta/razred i naziv srednje škole su
                    obavezni!
                  </label>
                )}
                <lable class="pr-lable" for="pr-cv_m1">
                  Vaš CV<span>(u pdf-u)</span>
                </lable>

                <FileUploadButton
                  id="pr-cv_m1"
                  onChange={(fileUrl) => {
                    setCv1(fileUrl);
                  }}
                  error={error}
                  prom={cv1}
                  fileValue={cv1}
                  setFileValue={setCv1}
                />
              </div>

              <div class="pr-member">
                <h1 class="pr-h1_m">Član 2</h1>
                <lable class="pr-lable" for="pr-name_m2">
                  Ime i prezime
                </lable>
                <input
                  type="text"
                  class={`pr-text ${error && ime2 === "" ? "errorClass" : ""}`}
                  id="pr-name_m2"
                  onChange={(e) => {
                    setIme2(e.target.value);
                  }}
                  required
                ></input>
                {error && ime2 === "" && (
                  <label class="pr-lable-error">Ime je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-email_m2">
                  Imejl
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && !validateEmail(imejl2) ? "errorClass" : ""
                  }`}
                  id="pr-email_m2"
                  onChange={(e) => {
                    setImejl2(e.target.value);
                  }}
                ></input>
                {error && !validateEmail(imejl2) && (
                  <label class="pr-lable-error">
                    Imejl je obavezan i mora biti u formatu
                    "myemail@gmail.domain"!
                  </label>
                )}
                <lable class="pr-lable" for="pr-phone_m2">
                  Broj telefona
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && brojTelefona2 === "" ? "errorClass" : ""
                  }`}
                  id="pr-phone_m2"
                  onChange={(e) => {
                    setbrojTelefon2(e.target.value);
                  }}
                  required
                ></input>
                {error && brojTelefona2 === "" && (
                  <label class="pr-lable-error">
                    Broj telefona je obavezan!
                  </label>
                )}
                <lable class="pr-lable" for="pr-select_m2">
                  Status: zaposlen, student, srednjoškolac
                </lable>
                <select
                  class="pr-select"
                  id="pr-select_m2"
                  onClick={(e) => {
                    setStatus2(e.target.value);
                  }}
                >
                  <option value="zaposlen">Zaposlen/a</option>
                  <option value="student">Student/kinja</option>
                  <option value="srednjoskolac">Srednjoškolac/ka</option>
                </select>
                <lable class="pr-lable" for="pr-year_m2">
                  Godina i naziv fakulteta/razred i naziv srednje škole
                </lable>
                <input
                  type="text"
                  id="pr-year_m2"
                  class={`pr-text ${
                    error && imeSkole2 === "" && status2 !== "zaposlen"
                      ? "errorClass"
                      : ""
                  }`}
                  onChange={(e) => {
                    setimeSkole2(e.target.value);
                  }}
                  required
                ></input>
                {error && imeSkole2 === "" && status2 !== "zaposlen" && (
                  <label class="pr-lable-error">
                    Godina i naziv fakulteta/razred i naziv srednje škole su
                    obavezni!
                  </label>
                )}
                <lable class="pr-lable" for="pr-cv_m2">
                  Vaš CV<span>(u pdf-u)</span>
                </lable>

                <FileUploadButton
                  id="pr-cv_m2"
                  onChange={(fileUrl) => {
                    setCv2(fileUrl);
                  }}
                  error={error}
                  prom={cv2}
                  fileValue={cv2}
                  setFileValue={setCv2}
                />
              </div>

              <div class="pr-member">
                <h1 class="pr-h1_m">Član 3</h1>
                <lable class="pr-lable" for="pr-name_m3">
                  Ime i prezime
                </lable>
                <input
                  type="text"
                  class={`pr-text ${error && ime3 === "" ? "errorClass" : ""}`}
                  id="pr-name_m3"
                  onChange={(e) => {
                    setIme3(e.target.value);
                  }}
                  required
                ></input>
                {error && ime3 === "" && (
                  <label class="pr-lable-error">Ime je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-email_m3">
                  Imejl
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && !validateEmail(imejl3) ? "errorClass" : ""
                  }`}
                  id="pr-email_m3"
                  onChange={(e) => {
                    setImejl3(e.target.value);
                  }}
                  required
                ></input>
                {error && !validateEmail(imejl3) && (
                  <label class="pr-lable-error">
                    Imejl je obavezan i mora biti u formatu
                    "myemail@gmail.domain"!
                  </label>
                )}
                <lable class="pr-lable" for="pr-phone_m3">
                  Broj telefona
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error && brojTelefona3 === "" ? "errorClass" : ""
                  }`}
                  id="pr-phone_m3"
                  onChange={(e) => {
                    setbrojTelefon3(e.target.value);
                  }}
                  required
                ></input>
                {error && brojTelefona3 === "" && (
                  <label class="pr-lable-error">
                    Broj telefona je obavezan!
                  </label>
                )}
                <lable class="pr-lable" for="pr-select_m3">
                  Status: zaposlen, student, srednjoškolac
                </lable>
                <select
                  class="pr-select"
                  id="pr-select_m3"
                  onChange={(e) => {
                    setStatus3(e.target.value);
                  }}
                >
                  <option value="zaposlen">Zaposlen/a</option>
                  <option value="student">Student/kinja</option>
                  <option value="srednjoskolac">Srednjoškolac/ka</option>
                </select>
                <lable class="pr-lable" for="pr-year_m3">
                  Godina i naziv fakulteta/razred i naziv srednje škole
                </lable>
                <input
                  type="text"
                  id="pr-year_m3"
                  class={`pr-text ${
                    error && imeSkole3 === "" && status3 !== "zaposlen"
                      ? "errorClass"
                      : ""
                  }`}
                  onChange={(e) => {
                    setimeSkole3(e.target.value);
                  }}
                ></input>
                {error && imeSkole3 === "" && status3 !== "zaposlen" && (
                  <label class="pr-lable-error">
                    Godina i naziv fakulteta/razred i naziv srednje škole su
                    obavezni!
                  </label>
                )}
                <lable class="pr-lable" for="pr-cv_m3">
                  Vaš CV<span>(u pdf-u)</span>
                </lable>

                <FileUploadButton
                  id="pr-cv_m3"
                  onChange={(fileUrl) => {
                    setCv3(fileUrl);
                  }}
                  error={error}
                  prom={cv3}
                  fileValue={cv3}
                  setFileValue={setCv3}
                />
              </div>

              <div class="pr-member">
                <h1 class="pr-h1_m">Član 4 (Opciono)</h1>
                <lable class="pr-lable" for="pr-name_m4">
                  Ime i prezime
                </lable>
                <input
                  type="text"
                  class={`pr-text ${error1 && !ime4 ? "errorClass" : ""}`}
                  id="pr-name_m4"
                  onChange={(e) => {
                    setIme4(e.target.value);
                  }}
                ></input>
                {error1 && !ime4 && (
                  <label class="pr-lable-error">Ime je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-email_m4">
                  Imejl
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error1 && !validateEmail(imejl4) ? "errorClass" : ""
                  }`}
                  id="pr-email_m4"
                  onChange={(e) => {
                    setImejl4(e.target.value);
                  }}
                ></input>
                {error1 && !validateEmail(imejl4) && (
                  <label class="pr-lable-error">
                    Imejl je obavezan i mora biti u formatu
                    "myemail@gmail.domain"!
                  </label>
                )}
                <lable class="pr-lable" for="pr-phone_m4">
                  Broj telefona
                </lable>
                <input
                  type="text"
                  class={`pr-text ${
                    error1 && brojTelefona4 === "" ? "errorClass" : ""
                  }`}
                  id="pr-phone_m4"
                  onChange={(e) => {
                    setbrojTelefon4(e.target.value);
                  }}
                ></input>
                {error1 && !brojTelefona4 && (
                  <label class="pr-lable-error">
                    Broj telefona je obavezan!
                  </label>
                )}
                <lable class="pr-lable" for="pr-select_m4">
                  Status: zaposlen, student, srednjoškolac
                </lable>
                <select
                  class="pr-select"
                  id="pr-select_m4"
                  onClick={(e) => {
                    setStatus4(e.target.value);
                  }}
                >
                  <option value="zaposlen">Zaposlen/a</option>
                  <option value="student">Student/kinja</option>
                  <option value="srednjoskolac">Srednjoškolac/ka</option>
                </select>
                <lable class="pr-lable" for="pr-year_m4">
                  Godina i naziv fakulteta/razred i naziv srednje škole
                </lable>
                <input
                  type="text"
                  id="pr-year_m4"
                  class={`pr-text ${
                    error1 && imeSkole4 === "" && status4 !== "zaposlen"
                      ? "errorClass"
                      : ""
                  }`}
                  onChange={(e) => {
                    setimeSkole4(e.target.value);
                  }}
                ></input>
                {error1 && !imeSkole4 && status4 !== "zaposlen" && (
                  <label class="pr-lable-error">
                    Godina i naziv fakulteta/razred i naziv srednje škole su
                    obavezni!
                  </label>
                )}
                <lable class="pr-lable" for="pr-cv_m4">
                  Vaš CV<span>(u pdf-u)</span>
                </lable>

                <FileUploadButton
                  id="pr-cv_m4"
                  onChange={(fileUrl) => {
                    setCv4(fileUrl);
                  }}
                  error={error1}
                  prom={cv4}
                  fileValue={cv4}
                  setFileValue={setCv4}
                />
              </div>
            </div>
            <div class="pr-team">
              <div class="pr-team-info">
                <h1 class="pr-h1_m">Tim</h1>
                <lable class="pr-lable" for="pr-teamname">
                  Ime tima
                </lable>
                <input
                  ref={ref}
                  type="text"
                  class={`pr-text ${
                    error && pitanje1 === "" ? "errorClass" : ""
                  }`}
                  id="pr-teamname"
                  onChange={(e) => setPitanje1(e.target.value)}
                  required
                ></input>
                {error && pitanje1 === "" && (
                  <label class="pr-lable-error">Ime tima je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-iskustvo">
                  Navedite i opišite prethodna iskustva u grupnom radu, a ako do
                  sada niste radili zajedno, opišite vaša pojedinačna iskustva.
                </lable>
                <textarea
                  class={`pr-text-team_textarea ${
                    error && pitanje2 === "" ? "errorClass" : ""
                  }`}
                  id="pr-motivation"
                  onChange={(e) => setPitanje2(e.target.value)}
                  required
                ></textarea>
                {error && pitanje2 === "" && (
                  <label class="pr-lable-error">Ovo polje je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-vrline">
                  Šta vas je navelo da se prijavite na hakaton i šta želite da
                  postignete i naučite učestvovanjem na ovom takmičenju?
                </lable>
                <textarea
                  class={`pr-text-team_textarea ${
                    error && pitanje3 === "" ? "errorClass" : ""
                  }`}
                  id="pr-pit3"
                  onChange={(e) => {
                    setPitanje3(e.target.value);
                  }}
                  required
                ></textarea>
                {error && pitanje3 === "" && (
                  <label class="pr-lable-error">Ovo polje je obavezno!</label>
                )}
                <lable class="pr-lable" for="pr-vrline">
                  Šta biste istakli kao svoje vrline i mane koje bi uticale na
                  uspeh celog tima na takmičenju?
                </lable>
                <textarea
                  class={`pr-text-team_textarea ${
                    error && pitanje4 === "" ? "errorClass" : ""
                  }`}
                  id="pr-pit4"
                  onChange={(e) => setPitanje4(e.target.value)}
                  required
                ></textarea>
                {error && pitanje4 === "" && (
                  <label class="pr-lable-error">Ovo polje je obavezno!</label>
                )}
                <div class="pr-checkboxStyle">
                  {/* <div class="pr-temp"> */}
                  <input
                    type="checkbox"
                    id="pr-check1"
                    class="pr-check"
                    value="obavestenja"
                    onChange={(e) => {
                      setVesti(e.target.checked);
                    }}
                  ></input>
                  <label class="pr-lable_check">
                    Želimo da dobijamo obaveštenja o FONIS aktivnostima
                  </label>
                </div>
                <div class="pr-checkboxStyle">
                  <input
                    type="checkbox"
                    id="pr-check1"
                    class={`pr-check2 ${error && !pravila ? "errorClass" : ""}`}
                    value="pravila"
                    required
                    onChange={(e) => {
                      setPravila(e.target.checked);
                    }}
                  ></input>
                  <label class="pr-lable_check">
                    Saglasni smo sa pravilima takmičenja
                  </label>
                </div>
                {error && !pravila && (
                  <label class="pr-lable-error">Ovo polje je obavezno!</label>
                )}
              </div>
            </div>
          </div>
          <div class="pr-footer">
            <div class="pr-footer-dugme">
              <input
                type="submit"
                id="pr-submit"
                class="pr-submit"
                value="Pošalji prijavu"
                onClick={(e) => {
                  console.log(pravila);
                  e.preventDefault();
                  posaljiPrijavu();
                }}
              ></input>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Prijava;

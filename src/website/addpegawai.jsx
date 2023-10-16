import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/addpegawai.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";

function AddPegawai() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    // Inisialisasi nilai awal untuk setiap field formulir
    name: "",
    emp_id: "",
    rank: "",
    gol_room: "",
    position: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("emp_id", formData.emp_id);
      form.append("rank", formData.rank);
      form.append("gol_room", formData.gol_room);
      form.append("position", formData.position);

      axios
        .post(`${apiurl}employee/add`, form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((result) => {
          console.log("data API", result.data);
          const responseAPI = result.data;
          // setPegawaiData(responseAPI.data);
          setIsLoading(false);
          setFormData({
            name: "",
            emp_id: "",
            rank: "",
            gol_room: "",
            position: "",
          });
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.log("terjadi kesalahan: ", err);
          // setIsError(true);
          setIsLoading(false);
        });
    }
  }, [isSubmitting, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // showPopupLoading();
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name) errors.name = "Nama harus diisi";
    if (!data.emp_id) errors.emp_id = "NIP harus diisi";
    if (!data.rank) errors.rank = "Pangkat harus diisi";
    if (!data.gol_room) errors.gol_room = "Gol/Ruang harus diisi";
    if (!data.position) errors.position = "Jabatan harus diisi";

    return errors;
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={LogoAPKB} />
        </div>
      </header>
      <div className="container">
        <div className="header-title">
          <button className="btn-back" onClick={() => navigate("/dbpeg")}>
            <Icon icon="icon-park-outline:back" className="icon-back" />
          </button>
          <div className="title-form-add-pegawai">
            <h1>TAMBAH DATA PEGAWAI</h1>
          </div>
          <button className="btn-import-excel">
            <h1>IMPORT EXCEL</h1>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="body-form-add-pegawai">
          <div className="form-input">
            <p>Nama</p>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Nama"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-input">
            <p>Nip</p>
            <input
              type="text"
              name="emp_id"
              onChange={handleChange}
              value={formData.emp_id}
              placeholder="Nip"
            />
            {errors.emp_id && <span className="error">{errors.emp_id}</span>}
          </div>
          <div className="form-input">
            <p>Pangkat</p>
            <input
              type="text"
              name="rank"
              onChange={handleChange}
              value={formData.rank}
              placeholder="Pangkat"
            />
            {errors.rank && <span className="error">{errors.rank}</span>}
          </div>
          <div className="form-input">
            <p>Gol/Ruang</p>
            <input
              type="text"
              name="gol_room"
              onChange={handleChange}
              value={formData.gol_room}
              placeholder="Gol/Ruang"
            />
            {errors.gol_room && (
              <span className="error">{errors.gol_room}</span>
            )}
          </div>
          <div className="form-input">
            <p>Jabatan</p>
            <input
              type="text"
              name="position"
              onChange={handleChange}
              value={formData.position}
              placeholder="Jabatan"
            />
            {errors.position && (
              <span className="error">{errors.position}</span>
            )}
          </div>
          <button type="submit" className="btn-tambah-pegawai">
            <h1>TAMBAH</h1>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPegawai;

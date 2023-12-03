import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/dbpeg.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import GifDelate from "../Assets/gif-delete.gif";
import ExportExcelButton from "../Component/exportfile";

function DbPeg() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");
  const [dataExport, setDataExport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const showSuccessDelete = () => {
    const background = document.querySelector("#popup-success");
    background.style.display = "flex";
    const popupSuccessDelete = document.querySelector(".detail-success");
    popupSuccessDelete.style.display = "grid";
    popupSuccessDelete.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccessDelete = () => {
    const background = document.querySelector("#popup-success");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const popupSuccessDelete = document.querySelector(".detail-success");
    setTimeout(() => (popupSuccessDelete.style.display = "none"), 250);
    popupSuccessDelete.style.animation = "slide-up 0.3s ease-in-out";
    // refresh
    window.location.reload();
  };

  const showRelog = () => {
    const background = document.querySelector("#Relog");
    background.style.display = "flex";
    const popUpLogin = document.querySelector(".detail-Relog");
    popUpLogin.style.display = "grid";
    popUpLogin.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeRelog = () => {
    const background = document.querySelector("#Relog");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpLogin = document.querySelector(".detail-Relog");
    setTimeout(() => (popUpLogin.style.display = "none"), 250);
    popUpLogin.style.animation = "slide-up 0.3s ease-in-out";
    navigate(`/login`);
  };

  const showFailedDelete = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popupFailedDelete = document.querySelector(".detail-Failed");
    popupFailedDelete.style.display = "grid";
    popupFailedDelete.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailedDelete = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupFailedDelete = document.querySelector(".detail-Failed");
    setTimeout(() => (popupFailedDelete.style.display = "none"), 250);
    popupFailedDelete.style.animation = "slide-up 0.3s ease-in-out";
  };

  const showPopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    background.style.display = "flex";
    const PopupLoading = document.querySelector(".body-loading");
    PopupLoading.style.display = "grid";
    PopupLoading.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closePopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const PopupLoading = document.querySelector(".body-loading");
    setTimeout(() => (PopupLoading.style.display = "none"), 250);
    PopupLoading.style.animation = "slide-up 0.3s ease-in-out";
  };

  const [pegawaiData, setPegawaiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pegawaiToDelete, setPegawaiToDelete] = useState({});

  useEffect(() => {
    axios
      .get(`${apiurl}employee/data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;
        setDataExport(responseAPI.data);
        setPegawaiData(responseAPI.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("terjadi kesalahan: ", err);
        if (err.response && err.response.status === 401) {
          showRelog();
        } else {
          setIsLoading(false);
          // setIsError(true);
        }
      });
  }, []);

  const showDeletePopup = (id) => {
    const background = document.querySelector("#popup-Delete");
    background.style.display = "flex";
    const popupDelete = document.querySelector(".detail-Delete");
    popupDelete.style.display = "block";
    popupDelete.style.animation = "slide-down 0.3s ease-in-out";
    setPegawaiToDelete(id);
  };

  const handleDelete = () => {
    if (pegawaiToDelete) {
      showPopupLoading();
      axios
        .delete(`${apiurl}employee/delete/${pegawaiToDelete}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((response) => {
          // Penanganan ketika penghapusan berhasil
          console.log("Data berhasil dihapus");
          closeDeletePopup();
          showSuccessDelete();
          closePopupLoading();
        })
        .catch((error) => {
          // Penanganan ketika terjadi kesalahan saat menghapus data
          console.log("Terjadi kesalahan saat menghapus data:", error);
          showFailedDelete();
          closeDeletePopup();
          closePopupLoading();
        });
    }
  };

  const closeDeletePopup = () => {
    const background = document.querySelector("#popup-Delete");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const popupDelete = document.querySelector(".detail-Delete");
    setTimeout(() => (popupDelete.style.display = "none"), 250);
    popupDelete.style.animation = "slide-up 0.3s ease-in-out";
  };

  // search

  // Filter data based on the search term
  const filteredPegawaiData = pegawaiData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.emp_id.toString().includes(searchTerm) ||
      data.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.gol_room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (pegawaiData && !isError)
    return (
      <div>
        <header>
          <div className="logo">
            <img src={LogoAPKB} />
          </div>
          <ul className="navbar">
            <li onClick={() => navigate("/forminput")}>
              <a href="">INPUT</a>
            </li>
            <li onClick={() => navigate("/db")}>
              <a href="">DB</a>
            </li>
            <li onClick={() => navigate("/database")}>
              <a href="">DATABASE</a>
            </li>
            <li onClick={() => navigate("/print")}>
              <a href="">PRINT</a>
            </li>
            <li className="active">
              <a href="">DBPEG</a>
            </li>
          </ul>
        </header>

        <div className="table-container">
          <div className="header-table">
            <div className="search">
              <input
                type="text"
                placeholder="Pencarian"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="icon-search">
                <Icon icon="icomoon-free:search" width="15" />
              </div>
            </div>

            <ExportExcelButton data={dataExport} filename="data_pegawai" />
            <button
              className="tambah-data"
              onClick={() => navigate("/addpegawai")}
            >
              Tambah Data
            </button>
          </div>
          <table>
            <tr>
              <th id="id">NAMA</th>
              <th id="eselon">NIP</th>
              <th id="dpt">PANGKAT</th>
              <th id="nost">GOL/RUANG</th>
              <th id="datest">JABATAN</th>
              <th id="role">ROLE</th>
              <th id="aksi">AKSI</th>
            </tr>
            {Array.isArray(filteredPegawaiData) ? (
              filteredPegawaiData.map((data, index) => (
                <tr key={index}>
                  <td id="id">{data.name}</td>
                  <td id="eselon">{data.emp_id}</td>
                  <td id="dpt">{data.rank}</td>
                  <td id="nost">{data.gol_room}</td>
                  <td id="datest">{data.position}</td>
                  <td id="role">{data.role}</td>
                  <td id="action-db">
                    <div className="action-db">
                      <button
                        className="edit"
                        onClick={() => navigate(`/editpegawai/${data.id}`)}
                      >
                        <Icon icon="fluent:edit-16-regular" width="20" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => showDeletePopup(data.id)}
                      >
                        <Icon icon="fluent:delete-16-regular" width="20" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="7">Loading data...</td>
              </tr>
            )}
          </table>
        </div>

        <div id="popup-success">
          <div className="detail-success">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeSuccessDelete}
            />
            <div className="image-success">
              <img
                src={GifSuccess}
                alt="Delete Success"
                className="img-success"
              />
            </div>
            <p className="desc-success">Data berhasil dihapus!</p>
            <button className="btn-success" onClick={closeSuccessDelete}>
              Kembali
            </button>
          </div>
        </div>

        <div id="popup-Failed">
          <div className="detail-Failed">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeFailedDelete}
            />
            <div className="image-Failed">
              <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
            </div>
            <p className="desc-Failed">Gagal menghapus data!</p>
            <button className="btn-Failed" onClick={closeFailedDelete}>
              Kembali
            </button>
          </div>
        </div>

        <div id="Relog">
          <div className="detail-Relog">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeRelog}
            />
            <div className="image-Relog">
              <img src={GifFailed} alt="Relog" className="img-Failed" />
            </div>
            <p className="desc-Relog">
              Akses Login Anda Sudah Expired, Silahkan Login Ulang!!
            </p>
            <button className="btn-Relog" onClick={closeRelog}>
              Login Ulang
            </button>
          </div>
        </div>

        <div className="popup-Delete" id="popup-Delete">
          <div className="detail-Delete">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeDeletePopup}
            />
            <div className="image-Delete">
              <img src={GifDelate} alt="" className="img-Delete" />
            </div>
            <p className="desc-Delete">Anda yakin ingin menghapus?</p>
            <div className="con-btn-Delete">
              <button
                type="button"
                className="btn-batal"
                onClick={closeDeletePopup}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* page laoding */}

        <div className="popup-loading">
          <div className="body-loading" id="body-loading">
            <svg
              class="pl"
              viewBox="0 0 200 200"
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
                <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
              </defs>
              <circle
                class="pl__ring"
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="url(#pl-grad1)"
                stroke-width="36"
                stroke-dasharray="0 257 1 257"
                stroke-dashoffset="0.01"
                stroke-linecap="round"
                transform="rotate(-90,100,100)"
              />
              <line
                class="pl__ball"
                stroke="url(#pl-grad2)"
                x1="100"
                y1="18"
                x2="100.01"
                y2="182"
                stroke-width="36"
                stroke-dasharray="1 165"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        {/* end page loading */}
        <div className="popup-loading" id="popup-loadingDetail">
          <div className="body-loadingDetail" id="body-loadingDetail">
            <h2 class="animate-loadingDetail">Loading</h2>
            <p>Data Sedang Di Proses...</p>
          </div>
        </div>
      </div>
    );
}

export default DbPeg;

import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import LogoFooter from "../Assets/footer-logo 1.png";
import "../Style/login.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";

function Login() {
  const navigate = useNavigate();

  const showFailed = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popUpLogin = document.querySelector(".detail-Failed");
    popUpLogin.style.display = "grid";
    popUpLogin.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailed = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpLogin = document.querySelector(".detail-Failed");
    setTimeout(() => (popUpLogin.style.display = "none"), 250);
    popUpLogin.style.animation = "slide-up 0.3s ease-in-out";
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

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [isLoading, setisLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    console.log("mengirim data");
    showPopupLoading();
    axios
      .post(`${apiurl}login`, {
        name: name,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("token", response.data.access_token);
        setisLoading(false);
        // showSuccessAdd();
        closePopupLoading();
        if (response.data.access_token !== undefined)
          return window.location.replace("/db");
      })
      .catch((err) => {
        // console.log("terjadi kesalahan : ", err);
        showFailed();
        closePopupLoading();
        console.log(err.response);
        setisLoading(false);
      });
  };

  return (
    <div className="body-login">
      <img src={LogoAPKB} alt="" className="logo-beceku-head" />
      <div className="box-login">
        <h1>Login</h1>
        <form action="" onSubmit={login}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={name}
            onChange={handleName}
            required
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input-password"
            value={password}
            onChange={handlePassword}
            required
          />
          <button type="submit" value="Login">
            Login
          </button>
        </form>
      </div>

      {/* <footer>
        <img src={LogoFooter} />
      </footer>
      <div className="copyright">
        <p>© KPPBC Tipe Madya Cukai Kudus | 2018</p>
      </div> */}

      <div id="popup-Failed">
        <div className="detail-Failed">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeFailed}
          />
          <div className="image-Failed">
            <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
          </div>
          <p className="desc-Failed">Gagal Login!</p>
          <button className="btn-Failed" onClick={closeFailed}>
            Kembali
          </button>
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
    </div>
  );
}

export default Login;

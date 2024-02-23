import React from "react";

function Footer() {
  return (
    <footer className="py-5 bg-dark">
      <div className="container text-center">
        <br />
        <p className="m-0 text-center fst-normal text-white">
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: " #32CD32",
              fontWeight: "bold",
            }}
          >
            <img
              className="text-center"
              src="/image/Apple_Store_Logo.png"
              alt="logo"
              style={{ width: "100px" }}
            />
          </a>{" "}
          Registered ®️ {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

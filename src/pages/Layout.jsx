import React from "react";

const Layout = ({ children, hideHeader }) => {
  return (
    <>
      <div className='main-page'>
        {!hideHeader && (
          <>
            <h2 className='title'>Create Your Poster</h2>
          </>
        )}
        {children}
        <a href='tel:+918128099207' className='footer'>
          <img
            src={require("../asset/footer.png")}
            alt='footer'
            className='footerImg'
          />
        </a>
      </div>
    </>
  );
};

export default Layout;

import "./Footer.css";

export const Footer = () => {
  // eslint-disable-next-line
  return (
    <footer>
      <div className="p-40 bg-gradient-to-br from-slate-600 to-slate-400">
        <p>This is footer section.</p>
        <ul className="socials">
          <li>
            <a href="https://facebook.com">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <i className="fas fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <i className="fas fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <i className="fa fa-linkedin-square fa-3x"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <i className="fas fa-instagram"></i>
            </a>
          </li>
        </ul>
        <div className="footer-copyright">
          <p>copyright &copy;2022</p>
        </div>
      </div>
    </footer>
  );
};

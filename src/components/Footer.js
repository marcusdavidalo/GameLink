import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <div class="footer">
        <p>This is footer section.</p>
        <ul class="socials">
          <li>
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin-square"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
        <div class="footer-copyright">
          <p>copyright &copy;2022</p>
        </div>
      </div>
    </footer>
  );
};

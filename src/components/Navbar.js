export const Navbar = () => {
  // eslint-disable-next-line
  return (
    <nav>
      <a href="https://facebook.com">
        <img src="" alt="Logo" />
      </a>
      <form action="https://facebook.com">
        <input type="text" placeholder="Search Game" />
        <button>Search</button>
      </form>
      <ul>
        <li>
          <a href="https://facebook.com">Home</a>
        </li>
        <li>
          <a href="https://facebook.com">About</a>
        </li>
      </ul>
    </nav>
  );
};

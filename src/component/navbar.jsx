import './navbar.scss'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
function Navbar({isDarkMode, toggleMode}) {

  return (
    <>
      <div className="navbar">
        <div className='content' >
          <h1>WHERE IN THE WORD</h1>
          <div className="mode">
            <p onClick={toggleMode}>
            <DarkModeOutlinedIcon /> {isDarkMode ? 'Light Mode' : 'Dark Mode'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
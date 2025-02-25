const Header = ({ title, className }) => {
    return (
      <header className={`w-full text-center text-3xl py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg ${className}`}>
        {title}
      </header>
    );
  };
  
  export default Header;
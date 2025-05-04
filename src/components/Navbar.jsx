import ThemeToggle from "./ThemeToggle";

const Navbar = () => (
    <header className="bg-[#C0392B] p-4 flex items-center justify-between">
      <div className="space-x-4 flex items-center">
         <div className="text-4xl font-semibold font-audiowide">Spot-A-Beat</div>
         <ThemeToggle />
      </div>
    </header>
  );
  
  export default Navbar;
  
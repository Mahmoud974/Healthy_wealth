import Logo from "../assets/logo.webp";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <NavLink to="/">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="lg:h-12 h-12 lg:my-2 " 
                        height="auto"
                        width="auto"
                      
                    />
                </NavLink>
                <p className="font-bold text-2xl">HRnet</p>
                <div>
                    <div className="flex items-center lg:space-x-5 lg:space-y-0 space-y-2 flex-col lg:flex-row">
                        <NavLink to="/" className="flex items-center hover:font-bold hover:text-tropical">
                            <p>Create Employee</p>
                        </NavLink>
                        <NavLink to="/list-employee" className="flex items-center hover:font-bold hover:text-tropical">
                            <p>Employee List</p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="bg-tropical h-[0.08rem] w-full"></div>
        </nav>
    );
};

export default Navbar;

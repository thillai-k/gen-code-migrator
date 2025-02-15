import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./style.scss";

import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    return (
        <header className="cm-header d-flex align-items-center">
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="cm-header--logo-container py-3">
                        <a href="/">
                            <img
                                src="/genpactlogo.svg"
                                alt="Genpact AI Code migration"
                                className="cm-header--logo"
                            />
                        </a>
                        <a href="/" className="cm-header--menu icon-link">
                            <GiHamburgerMenu size={24} color="white" />
                        </a>
                    </div>
                    <h1 className="cm-header--title">
                        Gen-AI Powered Code Migrate
                    </h1>
                    <div className="cm-header--admin-container">
                        <a className="icon-link" href="/">
                            <FaSearch size={24} color="white" />
                        </a>
                        <span className="divider border-secondary"></span>
                        <a className="icon-link" href="/">
                            <FaUserCircle size={24} color="white" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;

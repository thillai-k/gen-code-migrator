import "./style.scss";

const Header = () => {
    return (
        <header className="cm-header d-flex align-items-center">
            <div className="container">
                <div className="d-flex align-items-center py-3">
                    <img
                        src="/genpactlogo.svg"
                        alt="Genpact AI Code migration"
                        className="cm-header--logo"
                    />
                    <h1 className="cm-header--title">
                        Gen-AI Powered Code Migrate
                    </h1>
                </div>
            </div>
        </header>
    );
};
export default Header;

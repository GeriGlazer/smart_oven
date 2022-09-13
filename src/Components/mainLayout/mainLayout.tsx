import { BrowserRouter } from "react-router-dom";
import FooterApp from "./footerApp/footerApp";
import HeaderApp from "./headerApp/headerApp";
import "./mainLayout.css";
import Routing from '../routing/routing';

function MainLayout(): JSX.Element {


    return (
        <div className="mainLayout">
            <BrowserRouter>
                <header>
                    <HeaderApp/>
                </header>
                <main>
                    <Routing/>
                </main>
                <footer>
                    <FooterApp/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default MainLayout;

import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {

    return (

        <>

            <NavigationBar />

            <div className="container mt-4">

                {children}

            </div>

            <Footer />

        </>

    );

};

export default MainLayout;
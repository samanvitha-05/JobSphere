const Loader = () => {

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
        >

            <div
                className="spinner-border text-primary"
                style={{
                    width: "4rem",
                    height: "4rem"
                }}
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

        </div>

    );

};

export default Loader;
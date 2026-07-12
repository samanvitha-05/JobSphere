import { Link } from "react-router-dom";

const EmptyState = ({
    icon = "📭",
    title = "Nothing Found",
    message = "There is nothing to display.",
    buttonText,
    buttonLink
}) => {

    return (

        <div className="text-center py-5">

            <h1 style={{ fontSize: "70px" }}>
                {icon}
            </h1>

            <h3 className="mt-3">
                {title}
            </h3>

            <p className="text-muted">
                {message}
            </p>

            {buttonText && (

                <Link
                    to={buttonLink}
                    className="btn btn-primary mt-2"
                >
                    {buttonText}
                </Link>

            )}

        </div>

    );

};

export default EmptyState;
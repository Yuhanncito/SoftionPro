import { Link } from "react-router-dom";
export const RedirectTo = ({ text, route }) => {
    return (
        <Link to={route} className=" text-sm font-medium text-white">
            {" "}
            {text}
        </Link>
    );
}

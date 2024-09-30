import { BiMenuAltRight } from "react-icons/bi";
import { RedirectTo } from "../atoms/LinksApp";
import { Link, NavLink } from "react-router-dom";
import { GlobalText } from "../atoms/TextsGlobal";



export const RedirectAppFunctions = ({ text, route }) => {
    return(
        text === "Proyecto" ? <Link to={route} className='hover:bg-blue-600 mx-2 bg-blue-500 justify-center w-28 text-lg flex items-center font-medium text-white rounded-xl py-2' >
        <BiMenuAltRight className="inline-block mr-2"/>
        <GlobalText text={text}/>
        </Link>:
        <NavLink to={route} className={({isActive, isPending}) => [isActive ? 'bg-blue-800 ' : ' bg-blue-500 ', isPending ? 'hover:bg-blue-600 mx-2 justify-center w-28 text-lg flex items-center font-medium text-white rounded-xl py-2 ' : '', ].join('hover:bg-blue-600 mx-2 justify-center w-28 text-lg flex items-center font-medium text-white rounded-xl py-2')  } >
            <BiMenuAltRight className="inline-block mr-2"/>
            <GlobalText text={text}/>
        </NavLink>
    )
}
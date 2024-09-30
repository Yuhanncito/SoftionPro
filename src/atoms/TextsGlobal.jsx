const Title = ({ text, color }) => {

    return (
        <h1 className={`text-5xl font-bold max-sm:text-4xl ${ color? `text-${color}`: '' }`}>{text}</h1>
    );
}

const LogeTitle = ({ text, hidden }) => {

    return (
        <h1 className={`text-3xl font-bold text-white max-sm:text-3xl ${hidden}`}>{text}</h1>
    );
}

const SubTitle = ({ text, color }) => {

    return (
        <h1 className={`text-3xl max-sm:text-2xl font-semibold text${color? `-${color}` : ''} `}>{text}</h1>
    );
}

const Text = ({ text, color }) => {

    return (
        <p className={`text-lg text${color}`}>{text}</p>
    );
}

const SmallText = ({ text, color }) => {

    return (
        <p className={`text-xs text-${color}`}>{text}</p>
    );
}

const ProfileName = ({ text, hidden }) => {

    return (
        <p className={`text-sm font-semibold text-white ${hidden}`}>{text}</p>
    );
}

const GlobalText = ({ text, color }) => {

    return (
        <p className={` max-sm:hidden max-sm:text-xs text-sm font-semibold text-${color}`}>{text}</p>
    );
}

export { Title, SubTitle, Text, LogeTitle, SmallText, ProfileName, GlobalText }
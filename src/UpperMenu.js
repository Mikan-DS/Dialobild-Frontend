
export default function UpperMenu({dialobild}) {

    return <div className="UpperMenu" style={{alignSelf: "self-start"}}>
        <a href={"/"}>
            Проекты
        </a>
        <button onClick={dialobild.logout}>
            Выйти
        </button>
    </div>
}
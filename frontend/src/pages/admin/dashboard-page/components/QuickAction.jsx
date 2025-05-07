import style from './QuickAction.module.css'

function QuickActionCard(props) {
    return(
        <div className={style.card}>
            <p>{props.title}</p>
            <div className={style.accent}>
            </div>
        </div>
    )
}

export default function QuickAction() {
    return(
        <>
        <div className={style.cardContainer}>
            <QuickActionCard title='Quick Action 1'/>
            <QuickActionCard title='Quick Action 1'/>
            <QuickActionCard title='Quick Action 1'/>
            <QuickActionCard title='Quick Action 1'/>
        </div>
        </>
    )
}
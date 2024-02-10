import styles from "./styles.module.scss";

type Props = {
    actions: {
        username: string;
        action: string;
    }[];
    title: string;
};

const InfoHistory: React.FC<Props> = ({ actions, title }: Props) => {
    return (
        <div className={styles.infoHistory}>
            <div className={styles.title}>{title}</div>
            <ul>
                {actions.length === 0 ? (
                    <li className={styles.empty}>Nothing happened yet</li>
                ) : (
                    actions.map((action, index) => (
                        <li key={index}>
                            {action.username} <span>{action.action}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default InfoHistory;

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchInput from "../../components/SearchInput/SearchInput";
import styles from "./Header.module.scss";

type HeaderProps = {
    title: string;
    onSearch: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBackButtonClick: () => void;
};

const Header = ({ title, onSearch, onBackButtonClick }: HeaderProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <KeyboardBackspaceIcon
                    className={styles.backButton}
                    onClick={onBackButtonClick}
                />
                <p className={styles.header}>{title}</p>
            </div>
            <SearchInput handleOnChange={(e) => onSearch(e)} />
        </div>
    );
};
export default Header;

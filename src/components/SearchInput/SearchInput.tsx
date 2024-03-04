import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchInput.module.scss";
import { ChangeEvent, SyntheticEvent } from "react";

type SearchInputProps = {
    handleOnChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
};

const SearchInput = ({ handleOnChange }: SearchInputProps) => {
    return (
        <div className={styles.container}>
            <TextField
                placeholder="Search..."
                className={styles.inputInput}
                onChange={(e) => handleOnChange(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {<SearchIcon style={{color: 'white'}} />}
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchInput;

import React, { useContext } from 'react';
import { ActionType, ThemeContext } from 'lib/ThemeContext';
import ThemeButton from 'components/ThemeButton';

const ThemeButtonContainer: React.FC = () => {
    const { theme, dispatch } = useContext(ThemeContext);

    const onToggle = () => {
        dispatch(ActionType.TOGGLE_THEME, {});
    };

    return (
        <ThemeButton theme={theme}
                     onClick={onToggle}
        />
    );
};

export default ThemeButtonContainer;

import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {modulo, clamp} from '../../util';
import IconButton from '../action/picto-button/icon-button';
import Icon from '../content/icon';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-pagination": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "& button": {
            margin: theme.typography.calculate(0.5)
        },
        "& .page-icon": {
            font: theme.typography.label()
        }
    }
}));

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Pagination({className, role, count, defaultPage = 0, siblingCount = 1, wrap, onChange}) {
    const [current_page, set_current_page] = React.useState(defaultPage);

    const change_page = React.useCallback((next_page, direction = undefined) => {
        if(wrap)
            next_page = modulo(next_page, count);
        next_page = clamp(next_page, 0, count - 1);

        if(!direction)
            direction = next_page > current_page? 'right' : 'left';
        set_current_page(next_page);
        onChange(next_page, direction);
    }, [count, wrap, onChange])

    const generatePageButtons = React.useCallback(() => {
        let buttons = []

        let center = current_page + 1;
        if(current_page + 1 < siblingCount + 3)
            center = siblingCount + 3;
        else if(current_page + 1 > count - (siblingCount + 3))
            center = count - (siblingCount + 3) + 1;
        console.log(center);

        if(count > (2 * siblingCount + 5)) {
            buttons.push(<IconButton role={role} scale={2} toggle={current_page === 0} onClick={() => change_page(0)}>
                <svg viewBox='0 0 16 16'>
                    <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>1</text>
                </svg>
            </IconButton>);
            if(current_page + 1 > siblingCount + 3)
                buttons.push(<Icon scale={2}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>...</text>
                    </svg>
                </Icon>);
            else
                buttons.push(<IconButton role={role} scale={2} toggle={current_page === 1} onClick={() => change_page(1)}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>2</text>
                    </svg>
                </IconButton>);
            for(let i = -siblingCount; i < siblingCount + 1; i++) {
                buttons.push(<IconButton className="page-icon" role={role} scale={2} toggle={current_page === (center + i - 1)} onClick={() => change_page(center + i - 1)}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>{center + i}</text>
                    </svg>
                </IconButton>);
            }
            if(current_page + 1 < count - (siblingCount + 3) + 1)
                buttons.push(<Icon scale={2}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>...</text>
                    </svg>
                </Icon>);
            else
                buttons.push(<IconButton role={role} scale={2} toggle={current_page === count - 2} onClick={() => change_page(count - 2)}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>{count - 1}</text>
                    </svg>
                </IconButton>);
            buttons.push(<IconButton role={role} scale={2} toggle={current_page === count - 1} onClick={() => change_page(count - 1)}>
                <svg viewBox='0 0 16 16'>
                    <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>{count}</text>
                </svg>
            </IconButton>);
        } else {
            for(let i = 0; i < count; i++) {
                buttons.push(<IconButton role={role} scale={2} toggle={current_page === i} onClick={() => change_page(i)}>
                    <svg viewBox='0 0 16 16'>
                        <text className="page-icon" x="50%" y="50%" dominant-baseline="middle" textAnchor='middle'>{i + 1}</text>
                    </svg>
                </IconButton>);
            }
        }

        return buttons;
    }, [count, current_page, siblingCount])

    const next_left = () => {
        change_page(current_page - 1, 'left');
    }
    const next_right = () => {
        change_page(current_page + 1, 'right');
    }

    const classes = useStyles({});
    return (
        <div className={`${classes['arroz-pagination']} ${className?? ""}`}>
            <IconButton className="arroz-left-button" scale={2} onClick={next_left}>
                <svg viewBox='0 0 512 512'>
                    <path d="M351,9a15,15 0 01 19,0l29,29a15,15 0 01 0,19l-199,199l199,199a15,15 0 01 0,19l-29,29a15,15 0 01-19,0l-236-235a16,16 0 01 0-24z" />
                </svg>
            </IconButton>
            {generatePageButtons()}
            <IconButton className="arroz-left-button" scale={2} onClick={next_right}>
                <svg viewBox='0 0 512 512'>
                    <path d="M312,256l-199-199a15,15 0 01 0-19l29-29a15,15 0 01 19,0l236,235a16,16 0 01 0,24l-236,235a15,15 0 01-19,0l-29-29a15,15 0 01 0-19z" />
                </svg>
            </IconButton>
        </div>
    );
}
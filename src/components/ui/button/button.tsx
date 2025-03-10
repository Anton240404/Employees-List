import css from './button.module.css'

type Props = {
    color: 'success' | 'danger' | 'default',
    onClick: () => void,
    text: string,
    disabled?: boolean;

}

export function Button({color, onClick, text, disabled}: Props) {
    const classnames = [css.button]

    if (color === 'success') {
        classnames.push(css.success)
    } else if (color === 'danger') {
        classnames.push(css.danger)
    } else if (color === 'default') {
        classnames.push(css.default)
    }

    if (disabled) {
        classnames.push(css.disabled);
    }



    return (
        <>
            <button type="button" disabled={disabled} onClick={() => onClick()} className={classnames.join(' ')}>{text}</button>
        </>
    )
}
import css from './button.module.css'

type Props = {
    color: 'success' | 'danger' | 'default',
    onClick: () => void,
    text: string,

}

export function Button({color, onClick, text}: Props) {
    const classnames = [css.button]

    if (color === 'success') {
        classnames.push(css.success)
    } else if (color === 'danger') {
        classnames.push(css.danger)
    } else if (color === 'default') {
        classnames.push(css.default)
    }

    return (
        <>
            <button type="button" onClick={() => onClick()} className={classnames.join(' ')}>{text}</button>
        </>
    )
}
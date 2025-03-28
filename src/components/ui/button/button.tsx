import css from './button.module.css'

type Props = {
    color: 'success' | 'danger' | 'default',
    onClick?: () => void,
    text: string,
    disabled?: boolean;
    type?: 'submit' | 'button' | "reset"
}

export function Button(props: Props) {
    const classnames = [css.button]

    if (props.color === 'success') {
        classnames.push(css.success)
    } else if (props.color === 'danger') {
        classnames.push(css.danger)
    } else if (props.color === 'default') {
        classnames.push(css.default)
    }

    if (props.disabled) {
        classnames.push(css.disabled);
    }

    return (
        <>
            <button type={props.type || 'button'} disabled={props.disabled} onClick={() => props.onClick?.()}
                    className={classnames.join(' ')}>{props.text}</button>
        </>
    )
}
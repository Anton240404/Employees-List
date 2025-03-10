import style from './check-box.module.css';

type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
};

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
    return (
        <label >
            <input
                type="checkbox"
                className={style.text}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            {label && <span>{label}</span>}
        </label>
    );
}
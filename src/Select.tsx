import React from "react";

export type OptionValue = string | number;

export type IOption<T extends OptionValue> = {
    value: T;
    label: string;
    color?: string;
    checked?: boolean;
};

type Props<T extends OptionValue> = {
    options: IOption<T>[];
    value: T;
    onChange: (e: React.FormEvent<HTMLSelectElement>, value: T) => void;
    id: string,
    name: string,
    disabled?: boolean,
    classes: string
};

export function Select<T extends OptionValue>(props: Props<T>) {
    const disabled = props.disabled ? true : false;
    function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
        const { selectedIndex } = e.currentTarget;
        const selectedOption: IOption<T> = props.options[selectedIndex];
        props.onChange(e, selectedOption.value);
    }

    return (
        <select
            id={props.id}
            title="Select existing problem"
            value={props.value}
            onChange={handleOnChange}
            disabled={disabled}
            className={props.classes}
        >
            {props.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
import React from 'react'

const Search = ({
    onChange,
    value,
    placeholder = 'Type here',
    ...props
}) => {
    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={(ev) => onChange(ev.target.value)}
            {...props}

        />
    )
}

export default Search
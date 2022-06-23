import React, {useEffect, useRef} from 'react'

const DateSelector = ({
    value,
    minValue,
    maxValue,
    onChange
}) => {
    const inputRef = useRef()

    // useEffect(() => {
    //     if (minValue) {
    //         inputRef.current.min = minValue
    //     }
    //
    //     if (maxValue) {
    //         inputRef.current.maxValue = maxValue
    //     }
    // }, [minValue, maxValue])

    return (
        <input
            ref={inputRef}
            type="date"
            value={value}
            min={minValue}
            max={maxValue}
            onChange={(event) => onChange(event.target.value)}
        />
    )
}

export default DateSelector
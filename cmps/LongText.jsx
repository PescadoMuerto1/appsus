const { useState, useEffect } = React
export function LongText({ txt }) {
    const [isShowLong, setIsShowLong] = useState(false)

    return <p>
        {isShowLong ? txt : txt.substring(0, 100)} <button className="show-long" onClick={() => { setIsShowLong(prevIsShowLong => !prevIsShowLong) }}>{isShowLong ? 'Show less' : '...'}</button>
    </p>
}
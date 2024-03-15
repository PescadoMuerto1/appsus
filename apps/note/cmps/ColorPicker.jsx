const { useState, useRef, useEffect } = React

export function ColorPicker({colorPicker, setColorPicker, onSaveNote, note}) {
    const colors = ['#FAAFA7', '#F39F76', '#FFF8B8', '#E2F5D3', '#B4DDD3', '#F6E2DD', '#D3BFDB']
    const colorPickerRef = useRef(null)
    useEffect(() => console.log('mount'))

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (colorPicker && colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setColorPicker(false)
            }
        } 

        if(!colorPicker) document.removeEventListener("mousedown", handleClickOutside)
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [colorPicker])

    function onSetColor(ev, color) {
        ev.stopPropagation()
        console.log(note);
        const nStyle = {...note.style, backgroundColor:color}

        onSaveNote({...note , style:nStyle})
        // const style = { backgroundColor: color }
        // onChangeStyle(style)
    }

    return (
        <section className='color-picker' ref={colorPickerRef}>
            <div className="items-container">
                {
                    colors.map(color => <div key={color}
                        className={`item`}
                        onClick={(ev) => onSetColor(ev, color)}
                        style={{ backgroundColor: color }}
                    ></div>)
                }
            </div>
        </section>
    )
}
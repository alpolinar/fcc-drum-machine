import { useDispatch, useSelector } from 'react-redux'
import { selectPower, play } from '../app/drumKitSlice'

function DrumPad(props) {
    const power = useSelector(selectPower)
    const dispatch = useDispatch()

    function handleClick() {
        const pad = document.getElementById(`${props.pad.title.replace(' ', '-')}`)
        power ? pad.classList.toggle('orange') : pad.classList.toggle('grey')
        dispatch(play({ title: props.pad.title, audio: props.pad.source }))
        setTimeout(() => {
            power ? pad.classList.remove('orange') : pad.classList.remove('grey')
        }, 100);
    }

    return (
        <div tabIndex={0} id={props.pad.title.replace(' ', '-')} className="drum-pad" onClick={handleClick}>
            <audio id={props.pad.key} className="clip" src={power ? props.pad.source : '#'}></audio>{props.pad.key}
        </div>
    )
}

export default DrumPad
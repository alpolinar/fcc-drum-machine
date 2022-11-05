import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DrumPad from './components/DrumPad'
import { selectTitle, selectBank, selectPower, switchKit, switchPower, selectKit, selectVolume, play, volumeChange } from './app/drumKitSlice'

function App() {
  const title = useSelector(selectTitle)
  const bank = useSelector(selectBank)
  const power = useSelector(selectPower)
  const kit = useSelector(selectKit)
  const volume = useSelector(selectVolume)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = event => {
      switch (event.keyCode) {
        case 81:
        case 87:
        case 69:
        case 65:
        case 83:
        case 68:
        case 90:
        case 88:
        case 67:
          const keyChar = (event.key).toString().toUpperCase()
          const audioElem = document.querySelector(`audio#${keyChar}`)
          const pad = document.getElementById(`${audioElem.parentNode.id}`)
          power ? pad.classList.toggle('orange') : pad.classList.toggle('grey')
          setTimeout(() => {
            power ? pad.classList.remove('orange') : pad.classList.remove('grey')
          }, 100);
          if (!power) return
          const audio = audioElem.src
          const title = audioElem.parentNode.id.replace('-', ' ')
          dispatch(play({ title, audio }))

          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="inner-container" id="drum-machine">
      <div className="pad-bank">
        {kit.map(item => <DrumPad key={item.title.replace(' ', '-')} pad={item} />)}
      </div>
      <div className="logo">
        <div className="inner-logo">FCC&nbsp;</div><i className="inner-logo fa fa-free-code-camp"></i>
      </div>
      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={() => dispatch(switchPower())}>
            <div className="inner" style={power ? { float: 'right' } : { float: 'left' }}></div>
          </div>
        </div>
        <p id="display">&nbsp;{title}</p>
        <div className="volume-slider"><input max="1" min="0" step="0.01" type="range" onChange={(e) => dispatch(volumeChange(e.target.value))} value={volume} /></div>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={() => dispatch(switchKit())}>
            <div className="inner" style={bank ? { float: 'right' } : { float: 'left' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


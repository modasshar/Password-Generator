import { useCallback, useState , useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [allowNumber, setAllowNumber] = useState(false)
  const [allowChar, setAllowChar] = useState(false)
  const [password , setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass =''
    let str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"

    if(allowNumber) str += "0123456789"
    if(allowChar) str += "!@#$%^&*()_+"

    for(let i=1; i<length; i++){
      const char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, allowNumber, allowChar])

  useEffect(() => {
    generatePassword()
  }, [length, allowNumber, allowChar])

  const copyPasswordToClipboard = () =>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-xl text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value ={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard }
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>

      <div className='flex items-center gap-x-1'>
        <div className='flex items-center gap-x-1' >
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>setLength(e.target.value)}
          name=''
          id=''
          />

          <label htmlFor="length"> Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={allowNumber}
          onChange={() => {
            setAllowNumber((prev) => !prev)
          }}
          
          />
          <label htmlFor="number" >Numbers</label>

        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={allowChar}
          onChange={() => {
            setAllowChar((prev) => !prev)
          }}
          
          />
          <label htmlFor="number" >Charactors</label>

        </div>
      </div>

      

    </div>
  )
}

export default App

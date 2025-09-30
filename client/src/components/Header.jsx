import { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

function Header() {
  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative text-center">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 badge">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star icon" className="w-2.5" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
        Your own <span className="text-primary">blogging</span> <br />
        platform.
      </h1>
      <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
        This is your space to think out loud, to sharte what matters, and to
        write without filters. Wether it's a story or a question, your voice is
        heard.
      </p>

      <form
        className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white
         rounded overflow-hidden"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          placeholder="Search for a blog"
          required
          className="w-full pl-4 outline-none"
          ref={inputRef}
        />
        <button
          type="submit"
          className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="text-center mt-2">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* image bg */}
      <img
        src={assets.gradientBackground}
        alt="gradient"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  )
}

export default Header

import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import Logo from './Logo'
function Navbar() {
  const { navigate, token } = useAppContext()

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <Logo />
      <button
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        onClick={() => navigate('/admin')}
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  )
}

export default Navbar

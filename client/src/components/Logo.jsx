import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link
      to="/"
      className="cursor-pointer font-bold text-2xl md:text-3xl text-primary"
    >
      BLOG LOGO
    </Link>
  )
}

export default Logo

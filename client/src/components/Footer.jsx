import { Link } from 'react-router-dom'
import { footer_data } from '../assets/assets'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* logo */}
        <div>
          <Logo />
          <p className="max-w-[410px] mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quod.
          </p>
        </div>
        {/* links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright &copy; 2025 QuickBlog - All Right Reserved
      </p>
    </footer>
  )
}

export default Footer

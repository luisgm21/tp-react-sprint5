import { NavLink } from 'react-router-dom'

const Navbar = ({ links }) => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4">
                    {links.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                    `text-white hover:text-gray-300${isActive ? ' font-bold underline' : ''}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Navbar
import { Link } from 'react-router-dom'

const Navbar = ({ links }) => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.href} className="text-white hover:text-gray-300">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Navbar
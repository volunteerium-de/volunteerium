import { Link } from "react-router-dom"
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa"
import Subscribe from "./Subscribe"

const Footer = () => {
  const sections = [
    {
      title: "Information",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },

        { name: "Investors", path: "/investors" },
      ],
    },
  ]

  return (
    <div className="pt-6">
      <Subscribe />
      <footer className="w-full bg-light-gray-1 text-dark-gray-3 py-10">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4 text-primary-green">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.path}
                        className="text-gray-2 hover:text-primary-green transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media Icons */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4 text-primary-green">Follow Us</h2>
              <div className="flex space-x-4">
                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-primary-green transition-colors duration-300"
                >
                  <FaGithub size={25} />
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-primary-green transition-colors duration-300"
                >
                  <FaLinkedinIn size={25} />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-2 hover:text-primary-green transition-colors duration-300"
                >
                  <FaInstagram size={25} />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-light-gray-1 dark:border-dark-gray-3 pt-4 text-center text-gray-2 w-full">
            <p>&copy; {new Date().getFullYear()} Volunteerium. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

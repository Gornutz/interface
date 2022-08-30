import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useWidth } from '../../hooks/useWidth'
import styles from './layout.module.scss'

const Sidebar = () => {
  const router = useRouter()
  const pathName = router.pathname
  const width = useWidth()

  const [menuItems, setMenuItems] = useState([
    {
      href: '/',
      title: 'Overview',
      icon: <Image src={'/icons/overview.svg'} width={40} height={40} />,
      selectedIcon: '/icons/selectedOverview.svg',
      isSelected: false,
    },
    {
      href: '/earn',
      title: 'Earn',
      icon: <Image src={'/icons/lend.svg'} width={40} height={40} />,
      selectedIcon: '/icons/selectedLend.svg',
      isSelected: false,
    },
    {
      href: '/lend',
      title: 'Lend',
      icon: <Image src={'/icons/earn.svg'} width={40} height={40} />,
      selectedIcon: '/icons/selectedEarn.svg',
      isSelected: false,
    },
  ])

  useEffect(() => {
    if (pathName) {
      activeRoute(pathName)
    }
  }, [pathName])

  const activeRoute = (route: string) => {
    let _routes = [...menuItems]
    _routes = _routes.map((item) => {
      return {
        ...item,
        isSelected: item.href === route ? true : false,
      }
    })
    setMenuItems([..._routes])
  }

  return (
    <aside className="sidebar sticky top-0 h-screen bg-[#001223]">
      <div
        className={`flex items-center justify-center ${
          width > 680 ? 'h-[90px]' : ''
        }`}
      >
        {width > 680 && (
          <Link href={'/'}>
            <a>
              <Image
                src="/icons/home.svg"
                alt="Blueberry Web"
                width={40}
                height={40}
              />
            </a>
          </Link>
        )}
      </div>
      <nav>
        <ul>
          {menuItems.map(({ href, title, icon, selectedIcon, isSelected }) => (
            <li className="m-2" key={title}>
              <Link href={href}>
                <a
                  className={`flex p-2  justify-center rounded cursor-pointer ${
                    styles.itemIcon
                  } ${router.asPath === href && 'text-white'} ${
                    isSelected ? styles.selectedItem : ''
                  }`}
                >
                  {isSelected ? (
                    <Image
                      src={selectedIcon}
                      alt={title}
                      width={44}
                      height={44}
                    />
                  ) : (
                    icon
                  )}
                  <span className="text-xs">{title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="side-bottom px-1">
        <h5 className="py-2 flex place-content-center	w-full	text-xs	 ">
          Join Us
        </h5>
        <div>
          <Image
            src="/icons/twitter.svg"
            alt="farming image"
            width={20}
            height={18}
          />
        </div>
        <div>
          <Image
            src="/icons/discord.svg"
            alt="farming image"
            width={20}
            height={18}
          />
        </div>
        <div>
          <Image
            src="/icons/git.svg"
            alt="farming image"
            width={20}
            height={18}
          />
        </div>
        <div>
          <Image
            src="/icons/m_icon.svg"
            alt="farming image"
            width={20}
            height={18}
          />
        </div>
      </div>
      {/* <div className='md:flex justify-center sm:hidden 2sm:hidden'>
        <button className='absolute bottom-4 p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer'>Link to everything</button>
      </div> */}
    </aside>
  )
}

export default Sidebar

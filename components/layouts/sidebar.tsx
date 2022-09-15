import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { useWidth } from '../../hooks/useWidth'
import styles from './layout.module.scss'
import ColorModeContext from '../../context/ColorModeContext'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

const Sidebar = ({handleSidebarClick}:{handleSidebarClick: (value:string) => void}) => {
  const router = useRouter()
  const pathName = router.pathname
  const width = useWidth()
  const colorMode = useContext(ColorModeContext)
  const theme = useTheme()

  const [menuItems, setMenuItems] = useState([
    {
      href: '/',
      title: 'Overview',
      icon: <Image src={'/icons/overview.svg'} width={25} height={25} />,
      selectedIcon: '/icons/selectedOverview.svg',
      isSelected: false,
    },
    {
      href: '/earn',
      title: 'Earn',
      icon: <Image src={'/icons/earn.svg'} width={25} height={25} />,
      selectedIcon: '/icons/selectedEarn.svg',
      isSelected: false,
    },
    {
      href: '/lend',
      title: 'Lend',
      icon: <Image src={'/icons/lend.svg'} width={25} height={25} />,
      selectedIcon: '/icons/selectedLend.svg',
      isSelected: false,
    },
  ])

  useEffect(() => {
    if (pathName) {
      activeRoute(pathName)
    }
  }, [pathName])

  const activeRoute = (route: string) => {
    handleSidebarClick?.(route)
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
    <aside className={`sidebar sticky top-0 h-screen ${theme.palette.mode === 'light' ? 'bg-slate-200' : 'bg-[#001223]'} `}>
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
                      width={27}
                      height={27}
                    />
                  ) : (
                    icon
                  )}
                  <span className={`text-xs ${theme.palette.mode === 'light' ? 'text-[#000]' : 'text-[#ffffff59]'}`}>{title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="side-bottom px-1">
        <div className='flex justify-center'>
          <IconButton
            sx={{  }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            <Image
              src={
                theme.palette.mode === 'light'
                  ? '/icons/crescent.svg'
                  : '/icons/sun.svg'
              }
              alt=""
              width={34}
              height={34}
            />
          </IconButton>
        </div>
        <h5 className="py-2 flex place-content-center	w-full	text-xs	 ">
          Join Us
        </h5>
        <div>
          <Link href={"https://twitter.com/BLBprotocol/"}>
            <a>
              <Image
                src="/social/twitter.svg"
                alt="twitter"
                width={20}
                height={18}
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href={"https://discord.com/invite/VJAPVjy5uk"}>
            <a>
              <Image
                src="/social/discord.svg"
                alt="discord"
                width={20}
                height={18}
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href={"https://github.com/Blueberryfi"}>
            <a>
              <Image
                src={theme.palette.mode === 'light' ? "/social/github-dark.svg" : '/social/github-light.svg'}
                alt="github"
                width={20}
                height={18}
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href={"https://medium.com/@blueberryprotocol"}>
            <a>
              <Image
                src={theme.palette.mode === 'light' ? "/social/medium-dark.svg" : '/social/medium-light.svg'}
                alt="medium"
                width={20}
                height={18}
              />
            </a>
          </Link>
        </div>
      </div>
      {/* <div className='md:flex justify-center sm:hidden 2sm:hidden'>
        <button className='absolute bottom-4 p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer'>Link to everything</button>
      </div> */}
    </aside>
  )
}

export default Sidebar

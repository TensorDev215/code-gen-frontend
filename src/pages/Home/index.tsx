import { Link } from 'react-router-dom'

const BoxList = [
  {
    link: '/signin',
    title: 'Start Now',
    content1: 'Free access to CodeGen-V3.2',
    content2: 'Experience the intelligent model.'
  },
  {
    link: '/',
    title: 'Access API',
    content1: 'Build with the latest DeepSeek models',
    content2: 'Powerful models, smooth experience'
  }
]

interface SelectBoxProps {
  link: string
  title: string
  content1: string
  content2: string
}

const SelectBox = ({ link, title, content1, content2 }: SelectBoxProps) => {
  return (
    <Link
      to={link}
      className='flex flex-col text-left border bg-white rounded-2xl shadow-2xl  border-lightGray gap-0 border-solid p-8 pr-40 hover:cursor-pointer no-underline'
    >
      <h3 className='text-blue'>{title}</h3>
      <p className='m-0'>{content1}</p>
      <p className='m-0'>{content2}</p>
    </Link>
  )
}

const Home = () => {
  return (
    <main
      className='min-h-screen flex flex-col text-center gap-10 2-full bg-center font-body bg-cover p-8'
      style={{ backgroundImage: "url('images/banner-background.webp')" }}
    >
      <p className='font-body text-base text-gray'>
        Launching CodeGen-V3.2 -- Reashoning-first models built for agents. Now available on web, app & API. Click for
        details.
      </p>
      <h1 className='font-body text-blue text-6xl my-0'>CodeGen</h1>
      <h2>Into the unknown</h2>
      <div className='flex justify-center gap-8'>
        {BoxList.map((item, index) => (
          <SelectBox
            key={index}
            link={item.link}
            title={item.title}
            content1={item.content1}
            content2={item.content2}
          />
        ))}
      </div>
    </main>
  )
}

export default Home

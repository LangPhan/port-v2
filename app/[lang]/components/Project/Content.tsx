import Image, { StaticImageData } from 'next/image';
import StackIcon from 'tech-stack-icons';

type Props = {
  techs: string[],
  description: string,
  image: StaticImageData
}

const Content = ({ techs, description, image }: Props) => {
  return (
    <div>
      <div>
        <h3 className="text-2xl">Tech stacks</h3>
        <div className='flex gap-1 my-2 ml-2'>
          {techs && techs.map((tech, index) => {
            return (
              <StackIcon
                key={index}
                className='size-10 bg-white px-2 rounded-full hover:scale-110 hover:transition-transform'
                name={tech} />
            )
          })}
        </div>
      </div>
      <div>
        <h3 className="text-2xl">Description</h3>
        <p className='my-2 ml-2'>
          {description}
        </p>
      </div>
      {/* <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Card grid component
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Startup template Aceternity
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Random file upload lol
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div> */}
      <div className="w-full h-full my-5">
        <Image
          src={image}
          alt="hero template"
          width={1674}
          height={960}
          className="rounded-lg object-cover  w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
        />
      </div>
    </div>
  )
}

export default Content
import { ExternalLink, PlayCircleIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import StackIcon from 'tech-stack-icons';
import { Button } from '../ui/button';

type Props = {
  techs: string[],
  description: string,
  image: StaticImageData
  demoUrl?: string,
  visitUrl?: string,
}

const Content = ({ techs, description, image, demoUrl, visitUrl }: Props) => {
  console.log(visitUrl);

  return (
    <div>
      <div>
        <h3 className="text-lg md:text-2xl">Tech stacks</h3>
        <div className='flex flex-wrap gap-1 my-2 ml-2'>
          {techs && techs.map((tech, index) => {
            return (
              <StackIcon
                key={index}
                className='flex flex-shrink-0 size-8 md:size-10 bg-white px-2 rounded-full hover:scale-110 hover:transition-transform'
                name={tech}
              />
            )
          })}
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-2xl">Description</h3>
        <p className='my-2 ml-2'>
          {description}
        </p>
      </div>
      <div className="w-full h-full my-5">
        <Image
          src={image}
          alt="hero template"
          width={1674}
          height={960}
          loading='lazy'
          className="rounded-lg object-cover  w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
        />
      </div>
      <div className='w-full flex gap-1'>
        {demoUrl && (
          <Link href={demoUrl}>
            <Button variant={"destructive"} className='flex justify-center items-center gap-0.5'><span>Demo</span> <PlayCircleIcon className='translate-y-[1px]' /> </Button>
          </Link>
        )}
        {

          visitUrl && (
            <Link
              href={visitUrl}
              target='_blank'
            >
              <Button variant={"outline"} className='flex justify-center items-center gap-0.5'><span>Visit</span> <ExternalLink /></Button>

            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Content
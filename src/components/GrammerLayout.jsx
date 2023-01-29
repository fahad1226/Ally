import { useId } from 'react'

function BackgroundIllustration(props) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg> */}
    </div>
  )
}

export function GrammerLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-full w-full overflow-hidden pt-2">
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CircleBackground color="#13B5C8" className="animate-spin-slower " />
      </div> */}
      <div className="flex w-full flex-col sm:px-6 md:mx-auto md:max-w-7xl">
        <div className="relative mt-2 md:mt-4">
          <BackgroundIllustration className="absolute left-1/2 top-2 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
        </div>
        <h1 className="mb-2 text-center text-sm font-thin uppercase md:mb-6 lg:text-2xl">
          {title}
        </h1>
        <div className="z-50 h-full w-full rounded-md bg-white py-2 px-4 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none md:h-auto md:py-10 lg:rounded-5xl">
          {children}
        </div>
      </div>
    </main>
  )
}

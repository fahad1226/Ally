import { CircleBackground } from './CircleBackground'

export function ImageLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-full w-full overflow-hidden pt-2">
      <div className="flex w-full flex-col sm:px-6 md:mx-auto md:max-w-7xl">
        <div className="relative hidden md:block mt-2 sm:mt-2 md:mt-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CircleBackground color="#13B5C8" className="animate-spin-slower" />
          </div>
        </div>
        <h1 className="hidden sm:block text-center text-sm font-thin uppercase md:mb-10 lg:text-2xl">
          {title}
        </h1>
        <div className="md:z-50 h-full w-full rounded-md bg-white py-2 px-4 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none md:h-auto md:py-10 lg:rounded-5xl">
          {children}
        </div>
      </div>
    </main>
  )
}

import { Header } from '@/components/Header'
import { ImageLayout } from '@/components/ImageLayout'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import axios from 'axios'
import Head from 'next/head'
import { Fragment, useState } from 'react'

const subCategories = [
  { name: 'Random', value: 'image for my blog article' },
  { name: 'For My article', value: 'image for my blog article' },
  { name: 'Cosy winter night', value: 'A cosy winter night' },
  { name: 'Warm summer day', href: 'A warm summer day' },
  { name: 'Beutiful nature', href: 'a very beutiful nature photo' },
  { name: 'Black Children', value: 'beutiful black children photo' },
  { name: 'White Children', value: 'beutiful black children photo' },
  { name: 'Delecios Food', value: 'Delecios Food photo' },
  { name: 'Woman wtih shari', value: 'woman' },
  { name: 'Man wtih suit', value: 'man' },
  { name: 'Beutiful Cats', value: 'beutiful cats photo' },
  { name: 'Good dog', value: 'beutiful dogs photo' },
]
const filters = [
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function makeImage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [imageInfo, setImageInfo] = useState('')

  function makeRequestToOpenAI(e) {
    axios.get('http://localhost:3000/image')
    console.log('making request to open ai server', imageInfo)
  }

  return (
    <div>
      <Head>
        <title>Generate Images</title>
      </Head>
      <Header />

      <ImageLayout title="Generate beutiful images">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    {/* Filters */}
                    <div className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-900"
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto px-1 md:max-w-7xl lg:px-4">
            <div className="border-b border-gray-200 pt-2 pb-6 lg:flex lg:items-center lg:justify-between">
              <div className="w-[60%]">
                <label className="text-xs text-gray-500" htmlFor="input_image">
                  Describe what kind of image you want.
                </label>
                <input
                  id="input_image"
                  type="text"
                  value={imageInfo}
                  onChange={(e) => setImageInfo(e.target.value)}
                  className="mb-3 mt-1 w-full rounded-lg placeholder:text-xs placeholder:text-gray-400 focus:outline-none"
                  placeholder="i.e. a 300x400 cat image"
                />
              </div>

              <button
                type="button"
                onClick={() => makeRequestToOpenAI()}
                className="mr-2 mb-2 rounded-lg  bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 px-5 py-2 text-center text-sm font-medium text-white shadow-lg shadow-pink-500/50 hover:bg-gradient-to-br focus:outline-none dark:shadow-lg dark:shadow-pink-800/80 dark:focus:ring-pink-800 md:flex"
              >
                Create
              </button>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <div className="hidden sm:block">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className=" border-gray-200 py-2"
                    >
                      {({ open }) => (
                        <>
                          <div className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-5 w-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M18 12H6"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-5 w-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 6v12m6-6H6"
                                    />
                                  </svg>
                                )}
                              </span>
                            </Disclosure.Button>
                          </div>
                          <Disclosure.Panel className="pt-2">
                            <div className="flex flex-wrap items-center justify-evenly gap-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <div className="mt-6 overflow-auto rounded-lg border-[1px] border-b border-slate-300 bg-slate-50 p-2 pb-6 text-sm  font-medium text-gray-900 shadow-lg shadow-slate-100 sm:flex sm:h-36 sm:flex-grow sm:flex-wrap sm:items-center sm:justify-evenly sm:gap-4 lg:h-96 lg:border-none lg:bg-transparent">
                    {subCategories.map((category) => (
                      <div key={category.name}>
                        <button className="border[1px] w-40 overflow-hidden rounded-lg border border-gray-400 bg-white  py-2 uppercase text-teal-700 shadow-lg">
                          {category.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full">
                    {/* image will go here */}
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </ImageLayout>
    </div>
  )
}

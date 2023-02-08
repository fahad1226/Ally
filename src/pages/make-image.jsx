import { Header } from '@/components/Header'
import { ImageLayout } from '@/components/ImageLayout'
import api from '@/config/api'
import Head from 'next/head'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function makeImage() {
  const [instruction, setInstruction] = useState('')
  const [index, setIndex] = useState(null)
  const [image, setImage] = useState('')
  const [loader, setLoader] = useState(false)

  const subCategories = [
    {
      index: 1,
      name: 'Random',
      value: 'image for my blog article',
    },
    { index: 2, name: 'Article', value: 'image for my blog article' },
    { index: 3, name: 'Winter', value: 'A cosy winter night' },
    { index: 4, name: 'Summer', value: 'A beutiful summer nature' },
    { index: 5, name: 'Nature', value: 'a very beutiful nature photo' },
    { index: 6, name: 'Children', value: 'beutiful white children photo' },
    { index: 7, name: 'Food', value: 'Delecios Food photo' },
    { index: 8, name: 'Man', value: 'happy man' },
    { index: 9, name: 'Woman', value: 'happy woman' },
    { index: 10, name: 'Cats', value: 'beutiful cats photo' },
    { index: 11, name: 'Dog', value: 'beutiful dogs photo' },
    { index: 12, name: 'Qoutes', value: 'beutiful qoutes about life' },
  ]

  async function makeRequestToOpenAI(instrctns) {
    setLoader(true)
    setIndex(instrctns.index)
    const { data } = await api().get('open-ai/make-image', {
      params: {
        text: instrctns.value,
      },
    })
    setImage(data)
    setLoader(false)
  }

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = image
    a.download = 'image.png'
    a.target = '_blank'
    a.click()
  }

  const [clickCopy, setClickCopy] = useState(false)
  const handleCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = image
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()

    setClickCopy(true)

    setTimeout(() => {
      setClickCopy(false)
    }, 3000)
  }

  return (
    <div>
      <Head>
        <title>Generate Images</title>
      </Head>
      <Header />

      <ImageLayout title="Generate beutiful images">
        <div>
          <main className="mx-auto px-1 md:max-w-7xl lg:px-4">
            <div className="border-b border-gray-200 pt-2 pb-6 lg:flex lg:items-center lg:justify-between">
              <div className="w-[60%]">
                <label className="text-xs text-gray-500" htmlFor="input_image">
                  Describe what kind of image you want.
                </label>
                <input
                  id="input_image"
                  type="text"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="mb-3 mt-1 w-full rounded-lg placeholder:text-xs placeholder:text-gray-400 focus:outline-none"
                  placeholder="i.e. a 300x400 cat image"
                />
              </div>

              {loader ? (
                <button
                  type="button"
                  disabled
                  className="mr-2 mb-2 flex  cursor-not-allowed rounded-lg bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 px-5 py-2 text-center text-sm font-medium text-white opacity-70 shadow-lg shadow-pink-500/50 hover:bg-gradient-to-br focus:outline-none"
                >
                  <svg
                    className="mr-3 h-6 w-6 animate-spin"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
                      fill="rgba(247,241,241,1)"
                    />
                  </svg>
                  Creating...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => makeRequestToOpenAI(instruction)}
                  className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 px-8 py-2 text-center text-sm font-medium text-white shadow-lg shadow-pink-500/50 hover:bg-gradient-to-br focus:outline-none dark:shadow-lg dark:shadow-pink-800/80 dark:focus:ring-pink-800 md:flex"
                >
                  Create
                </button>
              )}
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="absolute top-0 right-9 rounded-full py-1"
                  />

                  <div className="mt-12 overflow-auto scroll-smooth rounded-lg border-[1px] border-b border-slate-300 bg-slate-50 p-2 text-sm  font-medium text-gray-900 shadow-lg shadow-slate-100 sm:flex sm:h-36 sm:flex-grow sm:flex-wrap sm:items-center sm:justify-evenly sm:gap-4 lg:h-96 lg:border-none lg:bg-transparent">
                    {subCategories.map((category) => (
                      <div key={category.index} className="flex">
                        <button
                          onClick={() => makeRequestToOpenAI(category)}
                          className={
                            category.index === index
                              ? 'border[1px] w-44 overflow-hidden rounded-lg border border-gray-400 bg-indigo-600  px-4 py-1 text-white shadow-lg'
                              : 'border[1px] w-44 overflow-hidden rounded-lg border border-gray-400 bg-white  px-4 py-1 text-teal-700 shadow-lg'
                          }
                        >
                          <div className="flex items-center justify-center gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>

                            <span className="text-center text-base">
                              {' '}
                              {category.name}
                            </span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {loader ? (
                  <div className="relative block w-full items-center rounded-lg border border-gray-100 bg-gray-700 p-6 shadow-md lg:col-span-3">
                    <h5 className="mb-2 text-center font-mono text-4xl font-bold tracking-tight text-white opacity-20 ">
                      Hold on for a moment!
                    </h5>
                    <p className="text-center text-xl text-white opacity-20 ">
                      for the very first time it will take some time to generate
                      the image.
                    </p>
                    <div
                      role="status"
                      className="absolute top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-16 w-16 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-3">
                    <div className="rounded-lg border-t-[1px] border-gray-200 shadow-md shadow-slate-300  lg:h-[27rem]">
                      {image && (
                        <img
                          src={image}
                          alt=""
                          className="h-[27rem] w-full rounded-md object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex justify-around gap-3">
                      <button className="rounded-lg border-[1px]  border-gray-300 bg-white px-6 py-2 text-black shadow-md shadow-slate-300">
                        <div className="flex items-center justify-evenly gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                            />
                          </svg>
                          <span>Save</span>
                        </div>
                      </button>
                      <button
                        className="rounded-lg bg-sky-600 px-6 py-2 text-white shadow-lg"
                        onClick={handleDownload}
                      >
                        <div className="flex items-center justify-evenly gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>

                          <span>Download</span>
                        </div>
                      </button>
                      <button
                        onClick={handleCopy}
                        className="rounded-lg border-[1px] border-gray-300 bg-white px-6 py-2 text-black shadow-md shadow-slate-300"
                      >
                        <div className="flex items-center justify-evenly gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                            />
                          </svg>

                          {clickCopy ? (
                            <span className="text-sm">URL Copied</span>
                          ) : (
                            <span className="text-sm">Copy Image URL</span>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </ImageLayout>
    </div>
  )
}

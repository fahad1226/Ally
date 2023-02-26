import api from '@/config/api'
import debounce from 'lodash.debounce'
import PQueue from 'p-queue'
import { useEffect, useRef, useState } from 'react'
import Search from './Search'

export default function Example() {
  const [images, setImages] = useState([])

  const [heyImages, setHeyImages] = useState([])

  useEffect(() => {
    // if (localStorage.getItem('images')) {
    //   const items = JSON.parse(localStorage.getItem('images'))
    //   setHeyImages(items)
    // } else {
    //   getAllImages()
    // }
    getAllImages()
  }, [])

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const getAllImages = async () => {
    setLoading(true)
    const { data } = await api().get('unsplash/all-images', {
      params: {
        page: currentPage,
      },
    })
    const { results } = data.response
    setImages(results)
    // localStorage.setItem('images', JSON.stringify(results))
    // const items = JSON.parse(localStorage.getItem('images'))
    // setHeyImages(items)
    setLoading(false)
  }

  const queue = new PQueue({ concurrency: 1 })
  const callLoadMore = debounce(() => {
    queue.clear()
    queue.add(() => loadMoreImages())
  }, 800)

  let myPage = 1
  const loadMoreImages = async () => {
    setLoading(true)
    try {
      const { data } = await api().get('unsplash/all-images', {
        params: {
          page: (myPage += 1),
        },
      })
      const { results } = data.response
      setLoading(false)
      setImages((prevImages) => [...prevImages, ...results])
    } catch (error) {}
  }

  const [isCopied, setIsCopied] = useState(false)
  const handleImageCopy = (imageUrl) => {
    const textarea = document.createElement('textarea')
    textarea.value = imageUrl
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2500)
  }

  const [thisImage, setThisImage] = useState(null)
  const handleThisImage = (imageId) => {
    setThisImage(imageId)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const inputRef = useRef()
  const handleScroll = () => {
    const bottom = inputRef.current.getBoundingClientRect().bottom
    const height = document.documentElement.clientHeight
    if (bottom < height + 200) {
      if (!loading) {
        callLoadMore()
      }
    }
  }

  const handleTakeScreenshot = (image) => {
    if (!image) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const imageElement = new Image()
    imageElement.src = image
    imageElement.crossOrigin = 'anonymous'
    imageElement.onload = () => {
      canvas.width = imageElement.width
      canvas.height = imageElement.height
      ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height)
      const data = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'download.png'
      link.href = data
      link.click()
    }
  }

  const handleSearchImage = async (query) => {
    setLoading(true)
    try {
      const { data } = await api().get('unsplash/search-image', {
        params: {
          query: query,
        },
      })
      const { results } = data.response
      setImages(results)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto" ref={inputRef}>
      <Search onClick={handleSearchImage} />

      <pre>{currentPage}</pre>

      <ul
        role="list"
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {images.map((image, index) => (
          <li key={index} className="relative">
            <div className="aspect-w-10 group block h-80 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md shadow-slate-400 transition-all duration-500 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:shadow-xl">
              <img
                onMouseEnter={() => handleThisImage(image.id)}
                src={image.urls.regular}
                alt=""
                className="h-full w-full cursor-pointer object-cover group-hover:opacity-75"
              />

              {thisImage === image.id && (
                <div className="absolute bottom-10 right-2 flex gap-2">
                  <button
                    onClick={() => handleImageCopy(image.urls.regular)}
                    type="button"
                    className="rounded-lg border border-gray-400  px-2 py-1 focus:outline-none"
                  >
                    {!isCopied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleTakeScreenshot(image.urls.regular)}
                    type="button"
                    className=" rounded-lg border border-gray-400  px-2 py-1 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-pink-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>

              <span className="text-xs text-gray-500">{image.likes}</span>
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="flex justify-center">
          <svg
            aria-hidden="true"
            className="mr-2 inline h-20 w-20 animate-spin fill-purple-600 text-gray-200 "
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
        </div>
      )}
    </div>
  )
}

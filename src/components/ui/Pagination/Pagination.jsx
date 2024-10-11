import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const PageButton = ({ page, currentPage, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`mx-1 px-[10px] rounded-[3px] border border-primary-green ${
      currentPage === page
        ? "border-2 border-primary-green dark:text-light-gray"
        : "dark:text-light-gray"
    } hover:bg-light-gray-2 dark:hover:bg-dark-gray-2
    ${currentPage !== page && "border border-opacity-15"}
    `}
  >
    {page}
  </button>
)

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1)
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1)

  const renderPageNumbers = () => {
    const pageNumbers = []
    const renderButton = (page) => (
      <PageButton key={page} page={page} currentPage={currentPage} onClick={onPageChange} />
    )

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderButton(i))
      }
    } else {
      pageNumbers.push(renderButton(1))

      if (currentPage > 3) {
        pageNumbers.push(
          <span key="ellipsis-start" className="mx-1 dark:text-light-gray">
            ...
          </span>
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderButton(i))
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <span key="ellipsis-end" className="mx-1 dark:text-light-gray">
            ...
          </span>
        )
      }
      pageNumbers.push(renderButton(totalPages))
    }
    return pageNumbers
  }

  return (
    <div className="my-4 flex justify-center items-center">
      <button
        onClick={handlePrevious}
        className={`disabled:bg-primary-green disabled:text-light-gray-3 flex items-center p-1 rounded-[3px] border border-dark-gray-1 dark:border-light-gray-1 border-opacity-40 dark:border-opacity-100 text-primary-green dark:text-light-green mr-1
        ${currentPage === 1 && "opacity-70 : dark:opacity-100"}`}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft className="mt-0.5 mr-0.5" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        className={`disabled:bg-primary-green disabled:text-light-gray-3 flex items-center p-1 rounded-[3px] border border-dark-gray-1 dark:border-light-gray-1 border-opacity-70 dark:border-opacity-100 text-primary-green dark:text-light-green ml-1
        ${currentPage === totalPages && "opacity-70 dark:opacity-100"}`}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight className="mt-0.5 ml-0.5" />
      </button>
    </div>
  )
}

export default Pagination

export default ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <svg className="remix">
      <use xlinkHref={`${'/remixicon.symbol.svg'}#ri-${icon}`} />
    </svg>
  </button>
)

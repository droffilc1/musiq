
type ChildrenProps = {
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void
}

const Button = ({children, className, onClick}: ChildrenProps) => {
  return <button className={`py-3 px-24 bg-pink-600 font-semibold rounded ${className || ""}`} onClick={onClick}>
    {children}
  </button>
}

export default Button;
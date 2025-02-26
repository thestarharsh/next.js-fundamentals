import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>marketing</h1>
      {children}
    </div>
  )
}

export default Layout

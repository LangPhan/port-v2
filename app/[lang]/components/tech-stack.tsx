import React from "react"

const TechStack = ({ children, description }: { children?: React.ReactElement, description: string }) => {
  return (
    <div>
      <div>
        <h3 className="text-2xl">Tech stacks</h3>
        {children}
      </div>
      <div>
        <h3 className="text-2xl">Description</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default TechStack
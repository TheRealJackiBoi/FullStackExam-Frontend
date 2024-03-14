export function H1({ text }: { text: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  )
}

export function H2({ text }: { text: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  )
}

export function H3({ text }: { text: string }) {
  return (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h3>
  )
}

export function H4({ text }: { text: string }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
  )
}

export function P({ text, className }: { text: string, className?: string }) {
  return <p className={"leading-7 [&:not(:first-child)]:mt-6" + className}>{text}</p>
}

export function BlockQuote({ text }: { text: string }) {
  return <blockquote className="mt-6 border-l-2 pl-6 italic">{text}</blockquote>
}

export function Lead({ text }: { text: string }) {
  return <p className="text-xl text-muted-foreground">{text}</p>
}

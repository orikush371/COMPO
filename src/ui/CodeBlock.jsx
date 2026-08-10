export function CodeBlock({ code }) {
  const lines = code.split('\n')
  return (
    <pre className="text-[13px] leading-[1.7] font-mono overflow-x-auto p-5 scrollbar-thin">
      {lines.map((line, i) => (
        <div key={i}>{highlight(line) || '\u00A0'}</div>
      ))}
    </pre>
  )
}

function highlight(line) {
  const tokens = []
  let rest = line
  let key = 0
  const push = (text, cls) => {
    if (text) tokens.push(<span key={key++} className={cls}>{text}</span>)
  }
  const regex = /(\/\/.*$)|('.*?'|".*?"|`[^`]*`)|(\b(?:import|export|function|return|const|let|from|default|useState|useEffect|useRef)\b)|(<\/?[A-Za-z][\w.]*)|([{}()<>])/g
  let last = 0
  let m
  while ((m = regex.exec(line))) {
    push(line.slice(last, m.index), 'text-ink-dim')
    if (m[1]) push(m[1], 'text-ink-faint italic')
    else if (m[2]) push(m[2], 'text-lime')
    else if (m[3]) push(m[3], 'text-amber')
    else if (m[4]) push(m[4], 'text-amber-2')
    else if (m[5]) push(m[5], 'text-ink-faint')
    last = m.index + m[0].length
  }
  push(line.slice(last), 'text-ink-dim')
  return tokens
}

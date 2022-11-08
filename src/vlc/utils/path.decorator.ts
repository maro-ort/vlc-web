export const pathDecorator = (path: string): string => {
  // Replace /home/* with ~/*
  if (path.startsWith('/home/')) {
    const homeRegex = /^\/home\/([^\\/]+)/
    path = path.replace(homeRegex, '~')
  }

  // Shorten folder names
  const tree = path.split('/')
  path = tree.map(w => w.slice(0, 2)).join('/')
  // path = tree.map(([first, ...word]) => first).join('/')

  return path
}

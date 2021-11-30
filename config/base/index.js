const pwa = {
  manifest: {
    short_name: 'Misiki',
    name: 'Misiki Store',
    description: 'Misiki store front',
    theme_color: '#fc7019',
  },
}

const colors = {
  primary: {
    100: '#ffefe6' /* light orange */,
    500: '#DF5502' /* orange */,
    700: '#ca4f02' /* lit darker orange */,
  },

  secondary: {
    100: '#fff5e6' /* light yellow */,
    500: '#ff9700' /* yellow */,
    700: '#e68a00' /* lit darker yellow */,
  },

  accent: '#000000' /* black */,

  success: '#32CD32' /* lime green */,

  error: '#eb0000' /* red */,
}

const fontFamily = {
  sans: ['Inter'],
}

module.exports = { pwa, colors, fontFamily }

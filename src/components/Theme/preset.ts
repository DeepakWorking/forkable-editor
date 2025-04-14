const brandColors = {
  brand: {
    primary: {
      DEFAULT: 'rgb(var(--primary-brand))',
      hover: 'rgb(var(--primary-brand-hover))',
      text: {
        DEFAULT: 'rgb(var(--primary-brand-text))',
        hover: 'rgb(var(--primary-brand-text-hover))',
      },
    },
    secondary: {
      DEFAULT: 'rgb(var(--secondary-brand))',
      hover: 'rgb(var(--secondary-brand-hover))',
      light: {
        DEFAULT: 'rgb(var(--secondary-brand-light))',
        hover: 'rgb(var(--secondary-brand-light-hover))',
      },
    },
    tertiary: {
      DEFAULT: 'rgb(var(--tertiary-brand))',
      hover: 'rgb(var(--tertiary-brand-hover))',
    },
    accent: {
      DEFAULT: 'rgb(var(--accent-brand))',
      hover: 'rgb(var(--accent-brand-hover))',
    },
  },
};

const statusColors = {
  success: {
    DEFAULT: 'rgb(var(--success))',
    hover: 'rgb(var(--success-hover))',
  },
  warning: {
    DEFAULT: 'rgb(var(--warning))',
    hover: 'rgb(var(--warning-hover))',
  },
  error: {
    DEFAULT: 'rgb(var(--error))',
    hover: 'rgb(var(--error-hover))',
  },
  info: {
    DEFAULT: 'rgb(var(--info))',
    hover: 'rgb(var(--info-hover))',
  },
};

const colors = {
  transparent: 'transparent',
  primary: {
    DEFAULT: 'rgb(var(--primary-text))',
    hover: 'rgb(var(--primary-text-hover))',
  },
  secondary: {
    DEFAULT: 'rgb(var(--secondary-text))',
    hover: 'rgb(var(--secondary-text-hover))',
  },
  tertiary: {
    DEFAULT: 'rgb(var(--tertiary-text))',
    hover: 'rgb(var(--tertiary-text-hover))',
  },
  ...brandColors,
  ...statusColors,
};

const theme = {
  fontFamily: {
    sans: ['"Inter"', 'sans-serif'],
  },
  textColor: colors,
  placeholderColor: colors,
  ringColor: colors,
  fill: colors,
  stroke: colors,
  backgroundColor: {
    transparent: 'transparent',
    primary: {
      DEFAULT: 'rgb(var(--primary-bg))',
      hover: 'rgb(var(--primary-bg-hover))',
    },
    secondary: {
      DEFAULT: 'rgb(var(--secondary-bg))',
      hover: 'rgb(var(--secondary-bg-hover))',
    },
    tertiary: {
      DEFAULT: 'rgb(var(--tertiary-bg))',
      hover: 'rgb(var(--tertiary-bg-hover))',
    },
    highlight: {
      DEFAULT: 'rgb(var(--highlight-bg))',
      hover: 'rgb(var(--highlight-bg-hover))',
    },
    ...brandColors,
    ...statusColors,
  },
  borderColor: {
    primary: {
      DEFAULT: 'rgb(var(--primary-border))',
      hover: 'rgb(var(--primary-border-hover))',
    },
    secondary: {
      DEFAULT: 'rgb(var(--secondary-border))',
      hover: 'rgb(var(--secondary-border-hover))',
    },
    tertiary: {
      DEFAULT: 'rgb(var(--tertiary-border))',
      hover: 'rgb(var(--tertiary-border-hover))',
    },
    ...brandColors,
    ...statusColors,
  },
  colors,
  boxShadow: {
    1: 'var(--shadow-1)',
    2: 'var(--shadow-2)',
    3: 'var(--shadow-3)',
    4: 'var(--shadow-4)',
    5: 'var(--shadow-5)',
    brand: 'var(--shadow-brand)',
  },
};

const presets = {
  darkMode: 'class',
  theme,
};

export default presets;
